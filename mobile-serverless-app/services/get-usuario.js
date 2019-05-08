import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function getUsuario(event, context) {
  const params = {
    TableName: "usuarios",
    Key: {
      username: event.pathParameters.id,
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      console.log("Resultado: ", result);
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.log("Erro: ", e);
    return failure({ status: false });
  }
}