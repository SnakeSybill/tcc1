import { Alert } from 'react-native';
import {
    CADASTRO_SUCESSO,
    CADASTRO_ERRO,
    LOGIN_SUCESSO,
    LOGIN_ERRO,
    REENVIA_CODIGO_CONFIRMACAO_USUARIO_SUCESSO,
    REENVIA_CODIGO_CONFIRMACAO_USUARIO_ERRO,
    CONFIRMA_CADASTRO_USUARIO_ERRO,
    CONFIRMA_CADASTRO_USUARIO_SUCESSO,
} from './../actions/types'; 

const INITIAL_STATE = {
    //codigoConfirmacao: '',
    esperandoCodigoConfirmacao: false,
    primeiroAcesso: false, 
    usuario: {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CADASTRO_ERRO:
            console.log("Erro de cadastro reducer");
            
            Alert.alert(
                'Algo errado não está certo: cadastro',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return state;

        case CADASTRO_SUCESSO:
        console.log("Cadastro sucesso reducer");
            Alert.alert(
                'Confirme seu cadastro com o código enviado por e-mail.',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, esperandoCodigoConfirmacao: true };

        case LOGIN_ERRO:
        console.log("Login erro reducer");
            Alert.alert(
                'Algo errado não está certo: login',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return state;

        case LOGIN_SUCESSO:
        console.log("Login sucesso reducer");
            Alert.alert(
                'Bem vindo de volta!',
                "Teste",
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, usuario: action.payload };

        case CONFIRMA_CADASTRO_USUARIO_ERRO:
        console.log("Confirmacao de cadastro erro reducer");
            Alert.alert(
                'Algo errado não está certo: confirmacao',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return state;

        case CONFIRMA_CADASTRO_USUARIO_SUCESSO:
        console.log("Confirmacao de cadastro sucesso reducer");
            Alert.alert(
                'Confirmado!',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, primeiroAcesso: true};

        case REENVIA_CODIGO_CONFIRMACAO_USUARIO_SUCESSO:
            return state;

        case REENVIA_CODIGO_CONFIRMACAO_USUARIO_ERRO:
            return state;

         

            }
    return state;
} 