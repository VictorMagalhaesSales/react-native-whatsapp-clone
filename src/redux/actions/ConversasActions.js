import firebase from '@firebase/app';
import '@firebase/auth';
import b64 from 'base-64';
import { MODIFICA_MENSAGEM } from '../types';

export const modificaMensagem = (texto) => {
    return dispatch => {
        dispatch({type: MODIFICA_MENSAGEM, payload: texto});
    }
}

export const enviaMensagem = (texto) => {
    console.log(texto);
    return ({type: 'asd'})
}