import { GET_COMMENTS_WITH_QUOTATION } from "../../constants/constants"



const initialState = []
//{id: '', date: '', authorId: '', authorName: '', content: ''}


function getCommentsWithQuotationsReducer(state=initialState, action) {
    switch (action.type){

        case GET_COMMENTS_WITH_QUOTATION:
            return  [...action.payload] //[...action.payload.data]
        default:
            return state
    }
    
}

export default getCommentsWithQuotationsReducer