import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function putConvidado(event, context) {
  const item = JSON.parse(event.body);
  const params = {
    TableName: "convidados-evento",
    Item: {
      username: item.usernameConvidado,
      idEvento: item.idEvento,
    }
  };

  const params2 = {
    TableName: "meus-convites",
    Item: {
      usernameConvidado: item.usernameConvidado,
      idEvento: item.idEvento,
      nomeEvento: item.nomeEvento,
      de: item.de
    }
  }

  try {
    await dynamoDbLib.call("put", params);
    await dynamoDbLib.call("put", params2);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}

export async function respostaConvite(event, context) {
  const item = JSON.parse(event.body);
  const params = {
    TableName: "convidados-evento",
    Item: {
      username: item.idConvidado,
      idEvento: item.idEvento,
      confirma: item.confirma
    }
  };

  const params2 = {
    TableName: "meus-convites",
    Key: {
      usernameConvidado: item.idConvidado,
      idEvento: item.idEvento
    }
  }

  try {
    await dynamoDbLib.call("put", params);
    console.log("PUT concluido");
    await dynamoDbLib.call("delete", params2);
    console.log("DELETE concluido");
    if (item.confirma) {
      var usuarioAgenda = await dynamoDbLib.call('get', {
        TableName: "usuarios",
        Key: {
          username: item.idConvidado,
        }
      });
      console.log("GET concluido", usuarioAgenda);
      usuarioAgenda.Item.agenda = usuarioAgenda.Item.agenda.concat({ idEvento: item.idEvento, nomeEvento: item.nomeEvento, criador: item.criador });
      console.log("Agenda alterada", usuarioAgenda);
      const params3 = {
        TableName: "usuarios",
        Item: usuarioAgenda.Item
      };
      await dynamoDbLib.call('put', params3);
    }
    return success(params.Item);
  } catch (e) {
    console.log("Erro: ", e);
    return failure({ status: false });
  }
}