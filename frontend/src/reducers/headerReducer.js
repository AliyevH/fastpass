import {
    SLIDE_MENU,
    SLIDE_SEARCH_PANEL
} from '../actions/headerActions';

const initialState = {
    menuValue: false,
    searchPanelValue: false
}

export default function HeaderReducer(state = initialState, action) {
    switch (action.type) {
        case SLIDE_MENU:
            return {
                ...state,
                menuValue: action.payload
            }
        case SLIDE_SEARCH_PANEL:
            return {
                ...state,
                searchPanelValue: action.payload
            }
        default:
            return state
    }
}


/*
    Bura melumatlarin saxlandigi bazadir.
    Oz bolmesine aid olan actiondan gelen Typler yoxlanilir ve gelen property statede saxlanilir.
    Bir funkction yazilir ve default olaraq chole export olunur.
*/