import { POST_TO_BASE_MEDIA } from "../../constants/constants"

const initialState = []

function postToBaseMediaReducer(state=initialState, action) {
    switch (action.type){

        case POST_TO_BASE_MEDIA:

            return {...action.payload}
        default:
            return state
    }
}
export default postToBaseMediaReducer