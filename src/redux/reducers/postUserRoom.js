import { POST_USER_ROOM } from "../../constants/constants"

const initialState = []


function postUserRoom(state=initialState, action) {
    switch (action.type){

        case POST_USER_ROOM:

            return action.payload
        default:
            return state
    }
    
}

export default postUserRoom