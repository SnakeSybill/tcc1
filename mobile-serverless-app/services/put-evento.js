import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function putEvento(event, context) {
  const item = JSON.parse(event.body);
  const params = {
    TableName: "eventos",
    Item: {
      idEvento: uuid(),
      criador: item.email,
      local: item.local,
      data: item.data,
      descricao: item.descricao,
      nome: item.nome,
      hora: item.hora
    }
  };

  try {
    await dynamoDbLib.call("put", params);

    var usuarioAgenda = await dynamoDbLib.call('get', {
      TableName: "usuarios",
      Key: {
        username: item.email,
      }
    });
    usuarioAgenda.Item.agenda = usuarioAgenda.Item.agenda.concat({idEvento: params.Item.idEvento, nomeEvento: item.nome, criador: item.email});
    const params3 = {
      TableName: "usuarios",
      Item: usuarioAgenda.Item
    };
    await dynamoDbLib.call('put', params3);
    return params.Item;
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}