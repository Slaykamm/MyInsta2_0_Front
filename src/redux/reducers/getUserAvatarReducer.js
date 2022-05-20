import { GET_USER_AVATAR } from "../../constants/constants"

const initialState = []
//{id: '', date: '', authorId: '', authorName: '', content: ''}


function getUserAvatarReducer(state=initialState, action) {
    switch (action.type){

        case GET_USER_AVATAR:

            return action.payload
        default:
            return state
    }
    
}

export default getUserAvatarReducer