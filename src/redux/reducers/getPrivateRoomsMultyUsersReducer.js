import { GET_PRIVATE_ROOMS_MULTI_USERS } from "../../constants/constants"

const initialState = []

function getPrivateRoomsMultyUsersReducer(state=initialState, action) {
    switch (action.type){

        case GET_PRIVATE_ROOMS_MULTI_USERS:
            return  [...action.payload] //[...action.payload.data]
        default:
            return state
    }
     
}

export default getPrivateRoomsMultyUsersReducer