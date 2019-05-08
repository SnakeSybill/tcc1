import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function putUsuario(event, context) {
  const item = JSON.parse(event.body);
  let username = item.username;
  console.log("username: ", username);
  let contatos = item.contatos.map(item => {return item})
  let agenda = item.agenda.map(item => {return item})
  const params = {
    TableName: "usuarios",
    Item: {
      username: username,
      contatos: contatos,
      agenda: agenda,
    }
  };

  console.log("params: ", params);
  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}