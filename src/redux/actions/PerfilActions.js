import { Actions } from 'react-native-router-flux';
import firebase from '@firebase/app';
import '@firebase/auth';
import { } from './../types';

export const adicionaContato = (email) => {
    firebase.database().ref(`/perfis/${email}`)
        .once('value')
            .then(snapshot => {
                if(snapshot.val()) {
                    const { currentUser } = firebase.auth();
                    currentUser.contatos.add(email);
                    firebase.database().ref(`/perfis/${currentUser.email}`)
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
