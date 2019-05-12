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
    console.log("IF (RESULT.ITEM): ", result.Item);
    if (result.Item) {
      console.log("Entrou no IF");
      console.log("Resultado: ", result);
      return success(result.Item);
    } else {
      console.log("Entrou no ELSE");
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.log("Erro: ", e);
    return failure({ status: false });
  }
}