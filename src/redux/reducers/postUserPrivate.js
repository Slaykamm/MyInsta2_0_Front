import { POST_USER_MESSAGE } from "../../constants/constants"

const initialState = []

function postUserPrivate(state=initialState, action) {
    switch (action.type){

        case POST_USER_MESSAGE:

            return action.payload
        default:
            return state
    }
}
export default postUserPrivate