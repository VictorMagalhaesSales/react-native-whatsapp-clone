import { Actions } from 'react-native-router-flux';
import firebase from '@firebase/app';
import '@firebase/auth';
import b64 from 'base-64';
import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO, ADICIONA_CONTATO_SUCESSO, LISTA_CONTATO_USUARIO } from './../types';

export const modificaAdicionaContatoEmail = (email) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: email
    }
}

export const adicionaContato = (email) => {
    return dispatch => {
        firebase.database().ref(`/perfis/${b64.encode(email)}`)
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

export const listContatosSubscribe = () => {
    return (dispatch) => {
        firebase.database().ref(`/perfis/${b64.encode(firebase.auth().currentUser.email)}/contatos`)
            .on('value', snapshot => {
                percorrerContatos(snapshot, dispatch);
            })
    }
}

const percorrerContatos = (snapshot, dispatch) => {
    if(snapshot.exists()) {
        let letContatosDetalhes = [];
        let qtdContatos = snapshot.numChildren();
        snapshot.forEach(contato => {
            firebase.database().ref(`/perfis/${b64.encode(contato.val().email)}`)
                .once('value').then(usuario => {
                    letContatosDetalhes.push({
                        nome: usuario.val().nome,
                        email: usuario.val().email
                    })
                    emitirListarContatosUsuarios(--qtdContatos, letContatosDetalhes, dispatch);
                })
        })
    } else {
        dispatch({ type: LISTA_CONTATO_USUARIO, payload: [] })
    }
}

const emitirListarContatosUsuarios = (qtdContatos, letContatosDetalhes, dispatch) => {
    if(!qtdContatos) dispatch({ type: LISTA_CONTATO_USUARIO, payload: letContatosDetalhes })
}

const adicionarContatoAoPerfil = (email, dispatch) => {
    let contatosDB = firebase.database().ref(`/perfis/`).child(b64.encode(firebase.auth().currentUser.email)).child('contatos');
    contatosDB.once('value')
        .then(snapshot => {
            let listContatos = updateListContatos(snapshot.val(), email, dispatch);
            if(listContatos) {
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
            }
        });
}

const updateListContatos = (listContatos, email, dispatch) => {
    if (listContatos) {
        let adicionaNovoEmail = true;
        listContatos.map(contato => {
            if (email === contato.email) {
                dispatch({
                    type: ADICIONA_CONTATO_ERRO, 
                    payload: 'O contato já está na sua lista de amigos'
                })
                adicionaNovoEmail = false;
            } else if (email === firebase.auth().currentUser.email) {
                dispatch({
                    type: ADICIONA_CONTATO_ERRO, 
                    payload: 'Você não pode adicionar você mesmo como contato'
                })
                adicionaNovoEmail = false;
            }
        })
        if (adicionaNovoEmail) {
            listContatos.push({email});
            return listContatos;
        } else return null;
    } else {
        if (email === firebase.auth().currentUser.email) {
            dispatch({
                type: ADICIONA_CONTATO_ERRO, 
                payload: 'Você não pode adicionar você mesmo como contato'
            })
            return null;
        } else {
            return [{email}];
        }
    }
}
