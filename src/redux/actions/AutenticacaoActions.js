import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { 
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
} from './../types';

export const modificaEmail = (texto) => ({
    type: MODIFICA_EMAIL,
    payload: texto
})
export const modificaSenha = (texto) => ({
    type: MODIFICA_SENHA,
    payload: texto
})
export const modificaNome = (texto) => ({
    type: MODIFICA_NOME,
    payload: texto
})
export const cadastraUsuario = (nome, email, senha) => {
    return dispatch => {
        dispatch({ type: CADASTRO_EM_ANDAMENTO });
        firebase.auth().createUserWithEmailAndPassword(String(email), String(senha))
        .then(user => {
            criarPerfilUsuario(user, dispatch);
        }, erro => {
            dispatch({type: CADASTRO_USUARIO_ERRO,  payload: erro.message});
        });
    }
}
export const loginUsuario = (email, senha) => {
    return dispatch => {
        dispatch({type: LOGIN_EM_ANDAMENTO});
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(() => {
                dispatch({type: LOGIN_USUARIO_SUCESSO});
                Actions.principal();
            }, erro => {
                dispatch({type: LOGIN_USUARIO_ERRO, payload: erro.message})
            });
    }
}

const criarPerfilUsuario = (user, dispatch) => {
    firebase.database().ref(`/perfis/${user.email}`)
        .push(user)
            .then(() => {
                dispatch({type: CADASTRO_USUARIO_SUCESSO});
                Actions.formLogin();
            })
}