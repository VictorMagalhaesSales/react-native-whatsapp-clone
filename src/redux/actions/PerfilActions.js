import { Actions } from 'react-native-router-flux';
import firebase from '@firebase/app';
import '@firebase/auth';
import b64 from 'base-64';
import { MODIFICA_ADICIONA_CONTATO_EMAIL } from './../types';

export const modificaAdicionaContatoEmail = (email) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: email
    }
}

export const adicionaContato = (email) => {
    let emailAdiciona = b64.encode(email);
    let emailCurrent = b64.encode(currentUser.email);
    firebase.database().ref(`/perfis/${b64.encode(emailAdiciona)}`)
        .once('value')
            .then(snapshot => {
                if(snapshot.val()) {
                    const { currentUser } = firebase.auth();
                    currentUser.contatos.add(emailAdiciona);
                    firebase.database().ref(`/perfis/${emailCurrent}`)
                        .push({ currentUser })
                            .then(() => Actions.principal())
                            .catch(erro =>
                                dispatch({ 
                                    type: ADICIONA_CONTATO_ERRO, 
                                    payload: erro.message
                                })
                            )
                } else {
                    dispatch({ 
                            type: ADICIONA_CONTATO_ERRO, 
                            payload: 'E-mail informado não corresponde a um usuário válido!'
                    })
                }
            });
}
