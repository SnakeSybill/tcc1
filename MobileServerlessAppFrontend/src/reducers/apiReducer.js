import {
    GET_USUARIO_SUCESSO,
    LIMPA_CONTATO_BUSCADO,
    GET_USUARIO_ERRO,
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
    PUT_USUARIO_ERRO,
    PUT_USUARIO_SUCESSO,
    ALTERA_INCLUSAO_CONCLUIDA,
    LOADING_API
} from './../actions/types';
import { Alert } from 'react-native';

const INITIAL_STATE = {
    loadingAPI: false,
    usuario: {
        agenda: [],
        username: "",
        contatos: [],
        nome: ""
    },
    eventosCriadosUsuario: [],
    meusConvites: [],
    eventoSelecionado: { criador: "", idEvento: "", nome: "", data: "", local: "", descricao: "", hora: "" },
    inclusaoConcluida: false,
    contatoBuscado: {},
    listaConvidados: []

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USUARIO_SUCESSO:
            console.log("No reducer: ", action.payload);
            return { ...state, usuario: action.payload, loadingAPI: false };

        case GET_USUARIO_ERRO:
            return { ...state, loadingAPI: false }

        case PUT_EVENTO_SUCESSO:
            Alert.alert(
                'Evento incluído',
                "Seu evento foi criado. Convide alguns contatos para participarem dele!",
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, eventoSelecionado: action.payload, inclusaoConcluida: true, loadingAPI: false };

        case PUT_EVENTO_ERRO:
            Alert.alert(
                'Ops, algo deu errado...',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, loadingAPI: false }

        case GET_EVENTOS_UCESSO:
            return { ...state, eventoSelecionado: action.payload, loadingAPI: false };

        case GET_EVENTO_ERRO:
            return { ...state, loadingAPI: false }

        case LIST_EVENTOS_SUCESSO:
            return { ...state, eventosCriadosUsuario: action.payload, loadingAPI: false };

        case LIST_EVENTOS_ERRO:
            return { ...state, loadingAPI: false }

        case DELETE_EVENTO_SUCESSO:
            return { ...state, loadingAPI: false }

        case DELETE_EVENTO_ERRO:
            return { ...state, loadingAPI: false }

        case PUT_CONVIDADO_SUCESSO:
            return { ...state, loadingAPI: false }

        case PUT_CONVIDADO_ERRO:
            return { ...state, loadingAPI: false }

        case LIST_CONVIDADOS_SUCESSO:
            return { ...state, listaConvidados: action.payload, loadingAPI: false };

        case LIST_CONVIDADOS_ERRO:
            return { ...state, loadingAPI: false }

        case PUT_MEUS_CONVITES_SUCESSO:
            return { ...state, loadingAPI: false }

        case PUT_MEUS_CONVITES_ERRO:
            return { ...state, loadingAPI: false }

        case LIST_MEUS_CONVITES_SUCESSO:
            return { ...state, meusConvites: action.payload, loadingAPI: false };

        case LIST_MEUS_CONVITES_ERRO:
            return { ...state, loadingAPI: false }

        case RESPOSTA_CONVITE_SUCESSO:
            Alert.alert(
                "Repondido",
                'Sua resposta foi enviada',
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, loadingAPI: false }

        case RESPOSTA_CONVITE_ERRO:
            Alert.alert(
                'Ops, algo deu errado...',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, loadingAPI: false }

        case MODIFICA_EVENTO_SELECIONADO:
            return { ...state, eventoSelecionado: action.payload, loadingAPI: false };

        case GET_USUARIO_CONTATO_SUCESSO:
            console.log("Usuario buscado reducer: ", action.payload);
            return { ...state, contatoBuscado: action.payload, loadingAPI: false }

        case GET_USUARIO_CONTATO_ERRO:
            Alert.alert(
                'Ops, algo deu errado...',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, contatoBuscado: {}, loadingAPI: false };;

        case PUT_USUARIO_ERRO:
            return { ...state, contatoBuscado: {}, loadingAPI: false };
        case PUT_USUARIO_SUCESSO:
            return { ...state, usuario: action.payload, contatoBuscado: {}, loadingAPI: false };

        case LIMPA_CONTATO_BUSCADO:
            return { ...state, contatoBuscado: {}, loadingAPI: false };

        case ALTERA_INCLUSAO_CONCLUIDA:
            return { ...state, inclusaoConcluida: action.payload, loadingAPI: false }

        case LOADING_API:
            return { ...state, loadingAPI: action.payload }
    }
    return { ...state, loadingAPI: false }
}