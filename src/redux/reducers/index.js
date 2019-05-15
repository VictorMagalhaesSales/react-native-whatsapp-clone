import { combineReducers } from 'redux';
import PerfilReducer from './PerfilReducer';
import AutenticacaoReducer from './AutenticacaoReducer';
import ListaContatosReducer from './ListaContatosReducer';
import ConversasReducer from './ConversasReducer';

export default combineReducers({
    AutenticacaoReducer,
    PerfilReducer,
    ListaContatosReducer,
    ConversasReducer
});