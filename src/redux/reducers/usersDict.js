import { USERS_DICTIONARY } from "../../constants/constants";

const initialState = [];


function usersDict(state=initialState, action) {

    switch (action.type) {
        case USERS_DICTIONARY:
            return [...action.payload];
    
    default:
        return state
    }
}

export default usersDict 