import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import PerfilReducer from './PerfilReducer';

export default combineReducers({
    AutenticacaoReducer,
    PerfilReducer
});