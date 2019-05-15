import firebase from '@firebase/app';
import '@firebase/auth';
import b64 from 'base-64';
import { MODIFICA_MENSAGEM, ENVIA_MENSAGEM_SUCESSO, LISTA_CONVERSAS_USUARIO, LISTA_CONVERSAS_LISTA_USUARIO } from '../types';

export const modificaMensagem = (texto) => {
    return dispatch => {
        dispatch({type: MODIFICA_MENSAGEM, payload: texto});
    }
}

export const enviarMensagem = (mensagem, contatoEmail) => {
    return dispatch => {
        if(mensagem) {
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
        } else {
            return {type: 'vazio'};
        }
    }
}

export const conversaUsuarioObserver = (contatoEmail) => {
    return dispatch => {
        firebase.database().ref(`/conversas/`)
            .child(b64.encode(firebase.auth().currentUser.email))
            .child(b64.encode(contatoEmail))
            .on('value', snapshot => {
                dispatch({type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val()})
            })
    }
}

export const listarConversasUsuarioObserver = () => {
    return dispatch => {
        firebase.database().ref(`/conversas/`)
            .child(b64.encode(firebase.auth().currentUser.email))
            .on('value', snapshot => {
                construirArrayParaTelaConversa(snapshot, dispatch);
            })
    }
}

const construirArrayParaTelaConversa = (snapshot, dispatch) => {
    let novaListaDeConversas = [];
    let qtdConversas = snapshot.numChildren();
    snapshot.forEach(conversa => {
        firebase.database().ref(`/perfis/${conversa.ref.key}`)
            .once('value').then(snapshot => {
                novaListaDeConversas.push({
                    nome: snapshot.val().nome,
                    email: snapshot.val().email
                })
                emitirListarConversas(--qtdConversas, novaListaDeConversas, dispatch);
            })
    })
}

const emitirListarConversas = (qtdConversas, novaListaDeConversas, dispatch) => {
    if(!qtdConversas) dispatch({type: LISTA_CONVERSAS_LISTA_USUARIO, payload: novaListaDeConversas });
}

const setarMensagens = (conversasEnv, conversasRes, dbConversasEnv, dbConversasRes, dispatch) => {
    dbConversasEnv.set(conversasEnv)
    .then(() => {
        dbConversasRes.set(conversasRes)
            .then(() => {
                dispatch({type: ENVIA_MENSAGEM_SUCESSO});
            })
    })
}