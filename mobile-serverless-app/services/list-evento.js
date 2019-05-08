import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function listEventos(event, context) {
  const params = {
    TableName: "eventos",
    KeyConditionExpression: "criador = :criador",
    ExpressionAttributeValues: {
      ":criador": event.pathParameters.idCriador
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    console.log("Aqui deu certo: ", result);
    return result;
  } catch (e) {
    console.log("Aqui deu errado: ", e);
    return failure({ status: false });
  }
}