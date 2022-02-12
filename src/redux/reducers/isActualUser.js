import { UNVERIFYED_USER_ADD, VERIFYED_USER_ADD } from "../../constants/constants";

const initialState = {UserLogin: 'None', UserPassword: 'None'};


function isActualUser(state=initialState, action) {

    switch (action.type) {
        case UNVERIFYED_USER_ADD:
            console.log("tet", {...action.payload, isVerifyed: false})
            return {...action.payload, isVerifyed: false};
    
        case VERIFYED_USER_ADD:
            return {...action.payload, isVerifyed: true};
    
    default:
        return state
    }
}

export default isActualUser 