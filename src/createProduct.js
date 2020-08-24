import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      id: uuid.v1(),
      name: data.name,
      price: data.price,
      productType: 'toy',
      qtd: data.qtd,
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});