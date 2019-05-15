import {MODIFICA_MENSAGEM, ENVIA_MENSAGEM_SUCESSO} from '../types';

const INITIAL_STATE = {
    mensagem: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload }
        case ENVIA_MENSAGEM_SUCESSO:
            return { ...state, mensagem: ''}
        default:
            return state;
    }
}