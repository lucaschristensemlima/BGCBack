import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      productType: 'toy',
      id: event.pathParameters.id
    },
    UpdateExpression: "SET qtd = :qtd, price = :price",
    ExpressionAttributeValues: {
      ":qtd": data.qtd || null,
      ":price": data.price || null
    },
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true };
});