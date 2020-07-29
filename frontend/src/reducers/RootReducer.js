import { combineReducers } from 'redux';
import HeaderReducer from './headerReducer';
import AuthReducer from './authReducer';


export default combineReducers({
    headerReducer: HeaderReducer,
    authReducer :AuthReducer
})