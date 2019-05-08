import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function listConvidados(event, context) {
  console.log("Entrou no service: evento: ", event);
  const params = {
    TableName: "convidados-evento",
    KeyConditionExpression: "idEvento = :idEvento",
    ExpressionAttributeValues: {
      ":idEvento": event.pathParameters.id,
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}