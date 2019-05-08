import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function createMeusConvites(event, context) {
  const item = JSON.parse(event.body);
  const params = {
    TableName: "meus-convites",
    Item: {
      usernameCriador: event.requestContext.identity.cognitoIdentityId,
      usernameConvidado: item.usernameConvidado,
      idEvento: item.idEvento,
      nomeEvento: item.nomeEvento
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}