import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function putEvento(event, context) {
  const item = JSON.parse(event.body);
  const params = {
    TableName: "eventos",
    Item: {
      idEvento: uuid(),
      criador: event.requestContext.identity.cognitoIdentityId,
      local: item.local
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    console.log("Teste")
    return params.Item;
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}