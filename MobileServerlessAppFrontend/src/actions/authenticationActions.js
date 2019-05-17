
import { Auth, API } from 'aws-amplify';
import {
    CADASTRO_SUCESSO,
    CADASTRO_ERRO,
    LOGIN_SUCESSO,
    LOGIN_ERRO,
    CONFIRMA_CADASTRO_USUARIO_SUCESSO,
    CONFIRMA_CADASTRO_USUARIO_ERRO,
    LOADING_AUTH
} from './types';
import { putUsuario } from './apiActions';

export const modificaLoading = (valor) => (
    {
        type: LOADING_AUTH,
        payload: valor,
    }
)

export const cadastraUsuario = (nome, email, senha) => {
    return dispatch => {
        
        Auth.signUp({
            username: email,
            //nomenick: nome,
            password: senha,
            attributes: {
                email: email
            }
        })
            .then(cadastro => {
                console.log("Sucesso ao cadastrar no cognito: ", cadastro);
                cadastroUsuarioSuccess(dispatch);
            })
            .catch(erro => {
                
                console.log("Erro ao cadastrar no cognito: ", erro);
                cadastroUsuarioError(erro, dispatch);
            });
    }
}

function cadastroUsuarioSuccess(dispatch) {
    dispatch({ type: CADASTRO_SUCESSO });
}

function cadastroUsuarioError(erro, dispatch) {
    dispatch({ type: CADASTRO_ERRO, payload: erro.message });
}

export const confirmaCadastroUsuario = (email, codigoConfirmacao, navigation, senha) => {
    return dispatch => {
        Auth.confirmSignUp(email, codigoConfirmacao, { forceAliasCreation: true })
            .then(confirmacao => {
                console.log("Sucesso ao confirmar: ", confirmacao);
                confirmaCadastroUsuarioSuccess(dispatch, navigation);
            })
            .catch(erro => {
                console.log("Erro ao confirmar: ", erro);
                confirmaCadastroUsuarioError(dispatch, erro);
            });
    }
}

function confirmaCadastroUsuarioSuccess(dispatch, navigation) {
    dispatch({ type: CONFIRMA_CADASTRO_USUARIO_SUCESSO });
    navigation.navigate('login');
}

function confirmaCadastroUsuarioError(dispatch, erro) {
    dispatch({ type: CONFIRMA_CADASTRO_USUARIO_ERRO, payload: erro.message });
}

export const reenviarCodigoConfirmacaoUsuario = (nome) => {
    return dispatch => {
        console.log("Entrou na action");
        Auth.resendSignUp(nome)
            .then(reenvio => {
                reenviaCodigoConfirmacaoUsuarioSucesso(dispatch);
                console.log('Sucesso ao reenviar: ', reenvio);
            })
            .catch(erro => {
                console.log("Erro ao reenviar: ", erro);
                reenviaCodigoConfirmacaoUsuarioErro(erro, dispatch);
            });
    }
}

function reenviaCodigoConfirmacaoUsuarioSucesso(dispatch) {
    dispatch({ type: REENVIA_CODIGO_CONFIRMACAO_USUARIO_SUCESSO });
}

function reenviaCodigoConfirmacaoUsuarioErro(dispatch, erro) {
    dispatch({ type: REENVIA_CODIGO_CONFIRMACAO_USUARIO_ERRO, payload: erro });
}

export const loginUsuario = (email, password, navigation) => {
    console.log("Entrou na action");
    return dispatch => {
        Auth.signIn(email, password)
            .then(usuario => {
                console.log("Sucesso ao logar: ", usuario);
                modificaLoading(false);
                loginUsuarioSuccess(dispatch, navigation, usuario);
            })
            .catch(erro => {
                console.log("Erro ao logar: ", erro);
                loginUsuarioError(dispatch, erro);
                modificaLoading(false);
            });
    }
}

function loginUsuarioSuccess(dispatch, navigation, usuario) {
    dispatch({ type: LOGIN_SUCESSO, payload: usuario });
    navigation.navigate('inicio');
}

function loginUsuarioError(dispatch, erro) {
    dispatch({ type: LOGIN_ERRO, payload: erro });
}