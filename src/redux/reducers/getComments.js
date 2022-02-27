import { COMMENTS_VIDEO_THUNK } from "../../constants/constants"



const initialState = []
//{id: '', date: '', authorId: '', authorName: '', content: ''}


function getComments(state=initialState, action) {
    switch (action.type){

        case COMMENTS_VIDEO_THUNK:

            return  [...action.newPayload] //[...action.payload.data]
        default:
            return state
    }
    
}

export default getComments