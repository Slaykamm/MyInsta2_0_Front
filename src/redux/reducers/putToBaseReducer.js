import { PUT_TO_BASE } from "../../constants/constants"

const initialState = []

function putToBaseReducer(state=initialState, action) {
    switch (action.type){

        case PUT_TO_BASE:
            console.log('action.payload', action.payload)

            return action.payload
        default:
            return state
    }
}
export default putToBaseReducer