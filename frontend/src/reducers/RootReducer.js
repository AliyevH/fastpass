import { combineReducers } from 'redux';
import HeaderReducer from './headerReducer';
import Auth from './Auth';


export default combineReducers({
    headerReducer: HeaderReducer,
    auth: Auth,
});