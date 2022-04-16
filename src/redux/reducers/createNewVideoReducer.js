import { CREATE_NEW_VIDEO } from "../../constants/constants"

const initialState = []


function createNewVideoReducer(state=initialState, action) {
    switch (action.type){

        case CREATE_NEW_VIDEO:
            console.log('reducer', action.payload)

            return action.payload
        default:
            return state
    }
    
}

export default createNewVideoReducer