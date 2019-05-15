import { 
    MODIFICA_MENSAGEM
} from '../types';

const INITIAL_STATE = {
    mensagem: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload }
        default:
            return state;
    }
}