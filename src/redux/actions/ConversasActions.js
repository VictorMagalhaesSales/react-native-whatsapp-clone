import firebase from '@firebase/app';
import '@firebase/auth';
import b64 from 'base-64';
import { MODIFICA_MENSAGEM } from '../types';

export const modificaMensagem = (texto) => {
    return dispatch => {
        console.log(texto);
        dispatch({type: MODIFICA_MENSAGEM, payload: texto});
    }
}