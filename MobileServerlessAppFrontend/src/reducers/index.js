import { combineReducers} from 'redux';
import authenticationReducer from './authenticationReducer';
import appReducer from './appReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    authenticationReducer,
    appReducer, 
    apiReducer
})