import { GET_PRIVATE_MESSAGES } from "../../constants/constants"

const initialState = []

function privateRoomMessages(state=initialState, action) {
    switch (action.type){

        case GET_PRIVATE_MESSAGES:
            return  [...action.payload] //[...action.payload.data]
        default:
            return state
    }
     
}

export default privateRoomMessages