
import axios from '../utils/Api';

export const HANDLE_CHANGE_LOGIN_FORM = 'HANDLE_CHANGE_LOGIN_FORM';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_LOADER = 'SET_LOADER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';


export const handleChange = (obj) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_CHANGE_LOGIN_FORM,
            payload: obj,
        })
    }
}

export const signIn = (userObject) => (dispatch) => {
    const {email, password} = userObject;
    dispatch({type: SET_LOADER, payload: true});
    axios.get(`/users?username=${email}`)
        .then(res => {
            console.log(res);
            if(res.status === 200){
                localStorage.setItem('authUser', JSON.stringify(res.data[0]));
                localStorage.setItem('token', "exampletoken");
                dispatch({type: SET_LOADER, payload: false});
                dispatch({type: LOGIN_SUCCESS, payload: res.data});
            }
        })
        .catch(err => {
            dispatch({type: LOGIN_ERROR, payload: "Some error occured when triggered action signin."});
            dispatch({type: SET_LOADER, payload: false});
        })
}

export const signOut = () => (dispatch) => {
    localStorage.clear();
    dispatch({type: SIGN_OUT, payload: null});
}