import { UNVERIFYED_USER_ADD, VERIFYED_USER_ADD } from "../../constants/constants";

const initialState = {username: 'None'};


function isActualUser(state=initialState, action) {

    switch (action.type) {
        case UNVERIFYED_USER_ADD:
            console.log("from reducer", action.payload)
            return {...action.payload};
    
        case VERIFYED_USER_ADD:
            return {...action.payload, isVerifyed: true};
    
    default:
        return state
    }
}

export default isActualUser 