import { PUT_NEW_USER_CREATE_DATA } from "../../constants/constants"

const initialState = []

function putNewUserDataReducer(state=initialState, action) {
    switch (action.type){

        case PUT_NEW_USER_CREATE_DATA:

            return action.payload
        default:
            return state
    }
}
export default putNewUserDataReducer