import { ERROR_API_PROCESSING } from "../../constants/constants";
const initialstate = []

function IsErrorAPI(state=initialstate, action) {
    switch (action.type){
        case ERROR_API_PROCESSING:
            return [action.payload]
        default:
            return state
    }
}

export default IsErrorAPI
