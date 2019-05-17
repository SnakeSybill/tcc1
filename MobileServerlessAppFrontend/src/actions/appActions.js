import {
    LOADING,
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_CODIGO_CONFIRMACAO
} from './types';

// Utils
export const modificaLoading = (valor) => (
    {
        type: LOADING,
        payload: valor,
    }
)

export const modificaEmail = (texto) => (
    {
        type: MODIFICA_EMAIL,
        payload: texto,
    }
)

export const modificaSenha = (texto) => (
    {
        type: MODIFICA_SENHA,
        payload: texto,
    }
)

export const modificaCodigoConfirmacao = (texto) => (
    {
        type: MODIFICA_CODIGO_CONFIRMACAO,
        payload: texto,
    }
)



