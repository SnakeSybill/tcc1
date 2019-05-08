import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function getEvento(event, context) {
    const item = JSON.parse(event.body);
  const params = {
    TableName: "eventos",
    KeyConditionExpression: "criador = :criador AND idEvento = :idEvento",
    ExpressionAttributeValues: {
      ":criador": event.pathParameters.criador,
      ":idEvento": event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);
  } catch (e) {
    console.log("Aqui deu errado: ", e);
    return failure({ status: false });
  }
}