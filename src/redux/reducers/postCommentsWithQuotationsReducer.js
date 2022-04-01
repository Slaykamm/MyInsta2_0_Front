import { POST_COMMENTS_WITH_QUOTATION } from "../../constants/constants"

const initialState = []

function postCommentsWithQuotationsReducer(state=initialState, action) {
    switch (action.type){

        case POST_COMMENTS_WITH_QUOTATION:
            return  {...action.payload}
        default:
            return state
    }
}

export default postCommentsWithQuotationsReducer