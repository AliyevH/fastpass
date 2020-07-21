export const HANDLE_CHANGE_LOGIN_FORM = 'HANDLE_CHANGE_LOGIN_FORM';
export const ACCESS_USER = 'ACCESS_USER';


export const handleChange = (obj) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_CHANGE_LOGIN_FORM,
            payload: obj,
        })
    }
}

// export const accessUser = (obj) => {
//     return (dispatch) => {
//         dispatch({
//             type: ACCESS_USER,
//             payload: obj,
//         })
//     }
// }