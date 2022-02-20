import { VIDEO_PREVIEWS_THUNK } from "../../constants/constants"

const initialState = []
//{id: '', date: '', authorId: '', authorName: '', content: ''}


function getPreview(state=initialState, action) {
    switch (action.type){

        case VIDEO_PREVIEWS_THUNK:

            return [...action.payload]
        default:
            return state
    }
    
}

export default getPreview