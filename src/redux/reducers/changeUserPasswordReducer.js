import { CHANGE_USER_PASSWORD } from "../../constants/constants"

const initialState = {}
//{id: '', date: '', authorId: '', authorName: '', content: ''}


function changeUserPasswordReducer(state=initialState, action) {
    switch (action.type){

        case CHANGE_USER_PASSWORD:
            console.log('passss', action.payload)

            return {...action.payload}
        default:
            return state
    }
    
}

export default changeUserPasswordReducer