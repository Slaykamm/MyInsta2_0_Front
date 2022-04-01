import { POST_TO_BASE } from "../../constants/constants"

const initialState = []

function postToBaseReducer(state=initialState, action) {
    switch (action.type){

        case POST_TO_BASE:
            console.log('action.payload', action.payload)

            return {...action.payload}
        default:
            return state
    }
}
export default postToBaseReducer