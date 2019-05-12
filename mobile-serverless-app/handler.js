import { putConvidado, respostaConvite } from './services/put-convidado';
import { putEvento } from './services/put-evento';
import { putMeusConvites } from './services/put-meus-convites';
import { putUsuario } from './services/put-usuario';
import { deleteEvento } from './services/delete-evento';
import { getEvento } from './services/get-evento';
import { getUsuario } from './services/get-usuario';
import { listConvidados } from './services/list-convidado';
import { listEventos } from './services/list-evento';
import { listMeusConvites } from './services/list-meus-convites';


export const PutConvidado = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await putConvidado(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

export const RespostaConvite = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await respostaConvite(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

export const PutEvento = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await putEvento(event);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

export const PutMeusConvites = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await putMeusConvites(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

export const PutUsuario = async (event, context) => {
  console.log("Objeto evento!: ", event);
  const result = await putUsuario(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

export const DeleteEvento = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await deleteEvento(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

export const GetEvento = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await getEvento(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

export const GetUsuario = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await getUsuario(event);
  console.log("Objeto Resultado: ", result);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

export const ListConvidados = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await listConvidados(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

export const ListEventos = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await listEventos(event);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

export const ListMeusConvites = async (event, context) => {
  console.log("Objeto evento: ", event);
  const result = await listMeusConvites(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      result
    }),
  };
};

const message = ({ time, ...rest }) => new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`);
  }, time * 1000)
);
