export const SLIDE_MENU = 'SLIDE_MENU';
export const SLIDE_SEARCH_PANEL = 'SLIDE_SEARCH_PANEL';


export const slideMenu = (arg) => {
    return (dispatch) => {
        dispatch({
            type: SLIDE_MENU,
            payload: arg
        })
    }
}

export const slideSearchPanel = (arg) => {
    return (dispatch) => {
        dispatch({
            type: SLIDE_SEARCH_PANEL,
            payload: arg
        })
    }
}