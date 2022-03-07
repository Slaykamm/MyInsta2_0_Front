import { VIDEO_OWNER_USER } from "../../constants/constants"

const initialState = []

function videoOwnerUser(state=initialState, action) {
    switch (action.type){

        case VIDEO_OWNER_USER:
            return [...action.payload]
        default:
            return state
    }
}
export default videoOwnerUser