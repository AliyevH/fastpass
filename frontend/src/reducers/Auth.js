import {
    CHANGE_LOGIN_FORM,
    GET_USER,
    SET_LOADING,
    SET_LOGIN_FORM_ERRORS,
    INIT_URL, 
    SIGNIN_SUCCESS,
    FORCE_QUIT,
    SIGNIN_ERROR,
    SIGN_OUT,
} from "../constants/ActionTypes";

const INIT_STATE = {
    initUrl: "",
    email: "",
    password: "",
    isLoading: false,
    loginError: {
        error: false,
        message: ""
    },
    formErrors: {
        email: {
            error: false,
            message: ""
        },
        password: {
            error: false,
            message: ""
        }
    },
    authUser: JSON.parse(localStorage.getItem('authUser')),
    access_token: JSON.parse(localStorage.getItem('access_token')),
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case INIT_URL: {
            return {...state, initURL: action.payload};
        }
        case GET_USER: {
            return {
                ...state,
                authUser: action.payload
            };
        }
        case CHANGE_LOGIN_FORM: {
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        }
        case SET_LOGIN_FORM_ERRORS: {
            return {
                ...state,
                formErrors: {
                    ...state.formErrors,
                    ...action.payload,
                },
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        case SIGNIN_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                loginError: {
                    error: false,
                    message: ""
                }
            }
        }
        case FORCE_QUIT: {
            return {
                ...state,
                access_token: null,
                authUser: null,
                isLoading: false,
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                access_token: null,
                authUser: null,
                isLoading: false,
            }
        }
        case SIGNIN_ERROR: {
            return {
                ...state,
                loginError: {
                    ...state.loginError,
                    ...action.payload,
                },
                isLoading: false,
                authUser: null,
                access_token: null,
            }
        }

        default:
            return state;
    }
}
