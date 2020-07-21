import {
    HANDLE_CHANGE_LOGIN_FORM,
    // ACCESS_USER
} from '../actions/authActions';

const initialState = {
    // access: false,
    hasUser: {
        username: 'admin',
        password: 'admin'
    },
    userInfo: {
        username: '',
        password: ''
    },
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
        // case ACCESS_USER: {
        //     return {
        //         ...state,
        //         access: action.payload
        //     }
        // }
        default:
            return state;
    }
} 