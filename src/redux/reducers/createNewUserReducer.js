import { CREATE_EMPTY_USER } from "../../constants/constants"

const initialState = []

function createNewUserReducer(state=initialState, action) {
    switch (action.type){
        case CREATE_EMPTY_USER:
            return {...action.payload}
        default:
            return state 
    }
}
export default createNewUserReducer