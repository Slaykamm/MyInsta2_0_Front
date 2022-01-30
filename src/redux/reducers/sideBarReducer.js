import { LEFT_SIDEBAR_SHOW, LEFT_SIDEBAR_HIDE } from "../../constants/constants";

const initialState = false;


function sideBarShow(state=initialState, action) {

    switch (action.type) {
        case LEFT_SIDEBAR_SHOW:
            return true;
    
        case LEFT_SIDEBAR_HIDE:
            return false;
    
    default:
        return state
    }
}

export default sideBarShow