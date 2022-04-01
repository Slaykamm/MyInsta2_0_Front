import { DELETE_FROM_BASE } from "../../constants/constants"

const initialState = []

function deleteFromBaseReducer(state=initialState, action) {
    switch (action.type){

        case DELETE_FROM_BASE:
            console.log('action.payload', action.payload)

            return action.payload
        default:
            return state
    }
}
export default deleteFromBaseReducer
