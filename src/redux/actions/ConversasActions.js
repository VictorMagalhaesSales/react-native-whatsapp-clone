import firebase from '@firebase/app';
import '@firebase/auth';
import b64 from 'base-64';
import { MODIFICA_MENSAGEM } from '../types';

export const modificaMensagem = (texto) => {
    return dispatch => {
        dispatch({type: MODIFICA_MENSAGEM, payload: texto});
    }
}



export const enviarMensagem = (mensagem, contatoEmail) => {
    return dispatch => {
        const dbConversasEnv = firebase.database().ref(`/conversas/`)
            .child(b64.encode(firebase.auth().currentUser.email)).child(b64.encode(contatoEmail));
        const dbConversasRes = firebase.database().ref(`/conversas/`)
            .child(b64.encode(contatoEmail)).child(b64.encode(firebase.auth().currentUser.email));
            
        dbConversasEnv.once('value').then(snapshot => {
            let conversasEnv = [];
            if(snapshot.exists()) conversasEnv = snapshot.val();
            conversasEnv.push({mensagem, tipo: 'e'});
            dbConversasRes.once('value').then(snapshot2 => {
                let conversasRes = [];
                if(snapshot2.exists()) conversasRes = snapshot2.val();
                conversasRes.push({mensagem, tipo: 'r'});
                setarMensagens(conversasEnv, conversasRes, dbConversasEnv, dbConversasRes, dispatch);
            })
        })
        
       
    }
}

const setarMensagens = (conversasEnv, conversasRes, dbConversasEnv, dbConversasRes, dispatch) => {
    dbConversasEnv.set(conversasEnv)
    .then(() => {
        dbConversasRes.set(conversasRes)
            .then(() => {
                dispatch({type: 'certo'});
            })
    })
}