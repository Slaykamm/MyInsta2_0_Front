import { GET_PRIVATE_ROOMS } from "../../constants/constants"

const initialState = []

function getPrivateRooms(state=initialState, action) {
    switch (action.type){

        case GET_PRIVATE_ROOMS:
            return  [...action.payload] //[...action.payload.data]
        default:
            return state
    }
     
}

export default getPrivateRooms