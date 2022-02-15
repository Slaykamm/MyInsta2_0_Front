import { SET_THUNK_REQUEST_REGISTERED_USERS } from "../../constants/constants"

const initialState = []
//{id: '', date: '', authorId: '', authorName: '', content: ''}


function asyncUsersRequest(state=initialState, action) {
    switch (action.type){

        case SET_THUNK_REQUEST_REGISTERED_USERS:
            console.log('reducer, ', [...action.payload] )
            return [...action.payload]
        default:
            return state
    }
    
}

export default asyncUsersRequest