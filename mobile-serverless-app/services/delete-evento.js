import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function deleteEvento(event, context) {
  const params = {
    TableName: "eventos",
    Key: {
        criador: event.requestContext.identity.cognitoIdentityId,
        idEvento: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}