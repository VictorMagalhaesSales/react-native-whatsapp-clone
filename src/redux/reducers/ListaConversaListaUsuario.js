import { LISTA_CONVERSAS_LISTA_USUARIO } from '../types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LISTA_CONVERSAS_LISTA_USUARIO:
            return action.payload
        default:
            return state;
    }
}