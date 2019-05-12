import { Actions } from 'react-native-router-flux';
import firebase from '@firebase/app';
import '@firebase/auth';
import b64 from 'base-64';
import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO, ADICIONA_CONTATO_SUCESSO } from './../types';

export const modificaAdicionaContatoEmail = (email) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: email
    }
}

export const adicionaContato = (email) => {
    return dispatch => {
        firebase.database().ref(`/perfis/${b64.encode(String(email))}`)
            .once('value')
                .then(snapshot => {
                    if(snapshot.val()) {
                       adicionarContatoAoPerfil(email, dispatch);
                    } else {
                        dispatch({ type: ADICIONA_CONTATO_ERRO, payload: 'E-mail informado não corresponde a um usuário válido!'})
                    }
                });
    }
}

const adicionarContatoAoPerfil = (email, dispatch) => {
    let emailCurrent = b64.encode(firebase.auth().currentUser.email);
    let contatosDB = firebase.database().ref(`/perfis/`).child(emailCurrent).child('contatos');
    contatosDB.once('value')
        .then(snapshot => {
            let listContatos = updateListContatos(snapshot.val(), email);
            contatosDB.set(listContatos)
                .then(() => {
                    dispatch({type: ADICIONA_CONTATO_SUCESSO})
                    Actions.principal()
                })
                .catch(erro =>
                    dispatch({
                        type: ADICIONA_CONTATO_ERRO, 
                        payload: erro.message
                    })
                )
        });
}

const updateListContatos = (listContatos, email) => {
    if (listContatos) {
        let adicionaNovoEmail = true;
        listContatos.map(contato => {
            if (contato.email === email) {
                alert('O contato já está na sua lista de amigos');
                adicionaNovoEmail = false;
            } else if (contato.email === firebase.auth().currentUser.email) {
                alert('Você não pode adicionar você mesmo como contato');
                adicionaNovoEmail = false;
            }
        })
        if (adicionaNovoEmail) listContatos.push({email});
        return listContatos;
    } else {
        return [{email}];
    }
}
