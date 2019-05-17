import { API } from 'aws-amplify';
import { Alert } from 'react-native';
import {
    LIMPA_CONTATO_BUSCADO,
    GET_USUARIO_SUCESSO,
    GET_USUARIO_ERRO,
    PUT_USUARIO_SUCESSO,
    PUT_USUARIO_ERRO,
    PUT_EVENTO_SUCESSO,
    PUT_EVENTO_ERRO,
    GET_EVENTOS_UCESSO,
    GET_EVENTO_ERRO,
    LIST_EVENTOS_SUCESSO,
    LIST_EVENTOS_ERRO,
    DELETE_EVENTO_SUCESSO,
    DELETE_EVENTO_ERRO,
    PUT_CONVIDADO_SUCESSO,
    PUT_CONVIDADO_ERRO,
    LIST_CONVIDADOS_SUCESSO,
    LIST_CONVIDADOS_ERRO,
    PUT_MEUS_CONVITES_SUCESSO,
    PUT_MEUS_CONVITES_ERRO,
    LIST_MEUS_CONVITES_SUCESSO,
    LIST_MEUS_CONVITES_ERRO,
    RESPOSTA_CONVITE_SUCESSO,
    RESPOSTA_CONVITE_ERRO,
    MODIFICA_EVENTO_SELECIONADO,
    GET_USUARIO_CONTATO_SUCESSO,
    GET_USUARIO_CONTATO_ERRO,
    ALTERA_INCLUSAO_CONCLUIDA,
    LOADING_API
} from './types';

export const modificaLoading = (valor) => (
    {
        type: LOADING_API,
        payload: valor,
    }
)

// Usuarios
export const configUsuarioAoLogar = (username) => {
    return dispatch => {
        let apiName = 'dev-mobile-serverless-app';
        let path = `get-usuario/${username}`;

        API.get(apiName, path).then(response => {
            const resposta = JSON.parse(response.result.body);
            console.log('Retorno API: ', resposta);
            if (Object.keys(resposta).includes("error")) {
                if (resposta.error === "Item not found.") {

                    let apiName = 'dev-mobile-serverless-app';
                    let path = "put-usuario";
                    API.post(apiName, path, {
                        body: { username, agenda: [], contatos: [] },
                    }).then(response2 => {
                        console.log('Retorno API: ', response2);
                        configUsuarioAoLogarSucesso(dispatch, JSON.parse(response2.result.body));
                    }).catch(error => {
                        console.log(error.response);
                        configUsuarioAoLogarErro(dispatch);
                    });
                }
            } else {
                configUsuarioAoLogarSucesso(dispatch, resposta);
            }
        }).catch(error => {
            console.log(error.response);
        });
    }
}

function configUsuarioAoLogarSucesso(dispatch, usuario) {
    dispatch({
        type: GET_USUARIO_SUCESSO,
        payload: usuario
    });
}

function configUsuarioAoLogarErro(dispatch) {
    dispatch({
        type: GET_USUARIO_ERRO
    });
}

export const getUsuario = (username) => {
    return dispatch => {

        username = "us-east-1:5ba69a55-c2e4-4525-80d5-9e4d9e84ba86";
        let apiName = 'dev-mobile-serverless-app';
        let path = `get-usuario/${username}`;

        API.get(apiName, path).then(response => {
            console.log('Retorno API: ', JSON.parse(response.result.body));
            getUsuarioSucesso(dispatch, JSON.parse(response.result.body));
        }).catch(error => {
            console.log(error.response);
            getUsuarioErro(dispatch, error);
        });
    }
}

function getUsuarioSucesso(dispatch, response) {
    dispatch({
        type: GET_USUARIO_SUCESSO,
        payload: response
    });
}

function getUsuarioErro(dispatch, erro) {
    dispatch({
        type: GET_USUARIO_ERRO
    });
}

export const getUsuarioContato = (username) => {
    return dispatch => {
        let apiName = 'dev-mobile-serverless-app';
        let path = `get-usuario/${username}`;

        API.get(apiName, path).then(response => {
            console.log('Retorno API: ', JSON.parse(response.result.body));
            if (response.result.statusCode == 500)
                getUsuarioContatoErro(dispatch, JSON.parse(response.result.body).error);
            else
                getUsuarioContatoSucesso(dispatch, JSON.parse(response.result.body));
        }).catch(error => {
            console.log(error.response);
            getUsuarioContatoErro(dispatch, error);
        });
    }
}

function getUsuarioContatoSucesso(dispatch, response) {
    dispatch({
        type: GET_USUARIO_CONTATO_SUCESSO,
        payload: response
    });
}

function getUsuarioContatoErro(dispatch, erro) {
    dispatch({
        type: GET_USUARIO_CONTATO_ERRO,
        payload: erro
    });
}

export const putUsuario = (usuario, navigation) => {
    return dispatch => {
        let apiName = 'dev-mobile-serverless-app';
        let path = "put-usuario";

        API.post(apiName, path, {
            body: usuario,
        }).then(response => {
            console.log('Retorno API: ', response);
            putUsuarioSucesso(dispatch, JSON.parse(response.result.body), navigation);
        }).catch(error => {
            console.log(error.response);
            putUsuarioErro(dispatch, error);
        });
    }
}

function putUsuarioSucesso(dispatch, response, navigation) {
    dispatch({
        type: PUT_USUARIO_SUCESSO,
        payload: response
    });
    navigation.navigate('inicio');
}

function putUsuarioErro(dispatch, erro) {
    dispatch({
        type: PUT_USUARIO_ERRO
    });
}

// Eventos
export const putEvento = (evento, navigation) => {
    return dispatch => {
        let apiName = 'dev-mobile-serverless-app';
        let path = "put-evento";

        API.post(apiName, path, {
            body: evento,
        }).then(response => {
            console.log('Retorno API putEvento: ', response);
            putEventoSucesso(dispatch, response, navigation);
        }).catch(error => {
            console.log(error.response);
            putEventoErro(dispatch, error);
        });
    }
}

function putEventoSucesso(dispatch, response, navigation) {
    dispatch({
        type: PUT_EVENTO_SUCESSO,
        payload: response
    });
}

function putEventoErro(dispatch, erro) {
    dispatch({
        type: PUT_EVENTO_ERRO
    });
}

export const getEvento = (idEvento, criador) => {
    return dispatch => {

        let apiName = 'dev-mobile-serverless-app';
        let path = `get-evento/${idEvento}/${criador}`;

        API.get(apiName, path).then(response => {
            getEventoSucesso(dispatch, JSON.parse(response.result.body)[0]);
        }).catch(error => {
            console.log(error.response);
            getEventoErro(dispatch, error);
        });
    }
}

function getEventoSucesso(dispatch, response) {
    dispatch({
        type: GET_EVENTOS_UCESSO,
        payload: response
    });
}

function getEventoErro(dispatch, erro) {
    dispatch({
        type: GET_EVENTO_ERRO
    });
}

export const listEventos = (email) => {
    return dispatch => {
        debugger;
        let apiName = 'dev-mobile-serverless-app';
        let path = `list-evento/${email}`;

        API.get(apiName, path).then(response => {
            console.log('Retorno API list-eventos: ', response);
            listEventosSucesso(dispatch, response.Items);
        }).catch(error => {
            console.log(error.response);
            listEventosErro(dispatch, error);
        });
    }
}

function listEventosSucesso(dispatch, response) {
    dispatch({
        type: LIST_EVENTOS_SUCESSO,
        payload: response
    });
}

function listEventosErro(dispatch, erro) {
    dispatch({
        type: LIST_EVENTOS_ERRO
    });
}

export const deleteEvento = (idEvento) => {
    return dispatch => {

        if (idEvento === "")
            idEvento = "1";

        let apiName = 'dev-mobile-serverless-app';
        let path = `delete-evento/${idEvento}`;

        API.del(apiName, path).then(response => {
            console.log('Retorno API: ', response);
            deleteEventoSucesso(dispatch, response);
        }).catch(error => {
            console.log(error.response);
            deleteEventoErro(dispatch, error);
        });
    }
}

function deleteEventoSucesso(dispatch, response) {
    dispatch({
        type: DELETE_EVENTO_SUCESSO,
        payload: response
    });
}

function deleteEventoErro(dispatch, erro) {
    dispatch({
        type: DELETE_EVENTO_ERRO
    });
}

// Convidado
export const putConvidado = (convidado) => {
    return dispatch => {
        console.log("Convite: ", convidado);
        let apiName = 'dev-mobile-serverless-app';
        let path = "put-convidado";

        API.post(apiName, path, {
            body: convidado
        }).then(response => {
            console.log('Retorno API: ', response);
            putConvidadoSucesso(dispatch, response);
        }).catch(error => {
            console.log(error.response);
            putConvidadoErro(dispatch, error);
        });
    }
}

function putConvidadoSucesso(dispatch, response) {
    dispatch({
        type: PUT_CONVIDADO_SUCESSO,
        payload: response
    });
}

function putConvidadoErro(dispatch, erro) {
    dispatch({
        type: PUT_CONVIDADO_ERRO
    });
}

export const listConvidados = (idEvento) => {
    return dispatch => {
        debugger;
        let apiName = 'dev-mobile-serverless-app';
        let path = `list-convidados/${idEvento}`;

        API.get(apiName, path).then(response => {
            console.log('Retorno API: ', response);
            listConvidadosSucesso(dispatch, JSON.parse(response.result.body));
        }).catch(error => {
            console.log(error.response);
            listConvidadosErro(dispatch, error);
        });
    }
}

function listConvidadosSucesso(dispatch, response) {
    dispatch({
        type: LIST_CONVIDADOS_SUCESSO,
        payload: response
    });
}

function listConvidadosErro(dispatch, erro) {
    dispatch({
        type: LIST_CONVIDADOS_ERRO
    });
}

// Meus convites
export const putMeusConvites = (convite) => {
    return dispatch => {

        if (convite === {}) // Para teste
            convite = {
                idEvento: "100",
                usernameConvidado: "username_teste",
                de: "USER-SUB-1234-teste",
                nomeEvento: "nomequalquer"
            };

        let apiName = 'dev-mobile-serverless-app';
        let path = "put-meus_convites";

        API.post(apiName, path, {
            body: convite
        }).then(response => {
            console.log('Retorno API: ', response);
            putMeusConvitesSucesso(dispatch, response);
        }).catch(error => {
            console.log(error.response);
            putMeusConvitesErro(dispatch, error);
        });
    }
}

function putMeusConvitesSucesso(dispatch, response) {
    dispatch({
        type: PUT_MEUS_CONVITES_SUCESSO,
        payload: response
    });
}

function putMeusConvitesErro(dispatch, erro) {
    dispatch({
        type: PUT_MEUS_CONVITES_ERRO
    });
}

export const listMeusConvites = (email) => {
    return dispatch => {
        console.log("Email: ", email);
        let username = "USER-SUB-1234-teste";
        let apiName = 'dev-mobile-serverless-app';
        let path = `list-meus-convites/${email}`;

        API.get(apiName, path).then(response => {
            console.log('Retorno API: ', response);
            listMeusConvitesSucesso(dispatch, JSON.parse(response.result.body));
        }).catch(error => {
            console.log(error.response);
            listMeusConvitesErro(dispatch, error);
        });
    }
}

function listMeusConvitesSucesso(dispatch, response) {
    dispatch({
        type: LIST_MEUS_CONVITES_SUCESSO,
        payload: response
    });
}

function listMeusConvitesErro(dispatch, erro) {
    dispatch({
        type: LIST_MEUS_CONVITES_ERRO
    });
}

// Resposta
export const respostaConvite = (resposta, idEvento, criador, nomeEvento, emailConvidado, navigation) => {
    return dispatch => {
        let apiName = 'dev-mobile-serverless-app';
        let path = 'resposta-convite';

        API.post(apiName, path, {
            body: {
                idEvento,
                criador,
                confirma: resposta,
                idConvidado: emailConvidado,
                nomeEvento: nomeEvento
            }
        }).then(response => {
            console.log('Retorno API: ', response);
            respostaConviteSucesso(dispatch, response, navigation);
        }).catch(error => {
            console.log(error.response);
            respostaConviteErro(dispatch, error);
        });
    }
}

function respostaConviteSucesso(dispatch, response, navigation) {
    dispatch({
        type: RESPOSTA_CONVITE_SUCESSO,
        payload: response
    });
    navigation.navigate("inicio");
}

function respostaConviteErro(dispatch, erro) {
    dispatch({
        type: RESPOSTA_CONVITE_ERRO
    });
}


///////
export const modificaEventoSelecionado = (eventoAlterado) => (
    {
        type: MODIFICA_EVENTO_SELECIONADO,
        payload: eventoAlterado,
    }
)

export const limpaContatoBuscado = () => (
    {
        type: LIMPA_CONTATO_BUSCADO,
    }
)

export const getEventoAgenda = (item, navigation) => {
    return dispatch => {
        debugger;
        let apiName = 'dev-mobile-serverless-app';
        let path = `get-evento/${item.idEvento}/${item.criador}`;

        API.get(apiName, path).then(response => {
            getEventoAgendaSucesso(dispatch, JSON.parse(response.result.body)[0], navigation);
        }).catch(error => {
            console.log(error.response);
            getEventoErro(dispatch, error);
        });
    }
}

function getEventoAgendaSucesso(dispatch, response, navigation) {
    dispatch({
        type: GET_EVENTOS_UCESSO,
        payload: response
    });
    navigation.navigate("viewEvento", {item: response});
}

export const alteraInclusaoConcluida = (valor) => (
    {
        type: ALTERA_INCLUSAO_CONCLUIDA,
        payload: valor,
    }
)