import {
    HANDLE_CHANGE_LOGIN_FORM,
    LOGIN_SUCCESS,
    SET_LOADER,
    LOGIN_ERROR,
    SIGN_OUT,
} from '../actions/authActions';
import { act } from 'react-dom/test-utils';

const initialState = {
   authUser: localStorage.getItem('authUser'),
   token: localStorage.getItem('token'),
   isLoading: false,
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case HANDLE_CHANGE_LOGIN_FORM: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.payload,
                },
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                authUser: action.payload[0],
                token: action.payload[0],
                error: false,
                message: ""
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                error: true,
                message: action.payload
            }
        }
        case SET_LOADER: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                authUser: null,
            }
        }
        default:
            return state;
    }
} 