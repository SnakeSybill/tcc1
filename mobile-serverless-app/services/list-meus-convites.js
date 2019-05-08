import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function listMeusConvites(event, context) {
    const item = JSON.parse(event.body);
  const params = {
    TableName: "meus-convites",
    KeyConditionExpression: "usernameConvidado = :usernameConvidado",
    ExpressionAttributeValues: {
      ":usernameConvidado": event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}