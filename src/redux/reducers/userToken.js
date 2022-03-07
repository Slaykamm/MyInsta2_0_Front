import { IS_USER_TOKEN } from "../../constants/constants"

const initialState = []

function UserToken(state=initialState, action) {

    switch (action.type){
        case IS_USER_TOKEN:

            return [...action.newPayload]

        default:
            return state
    }


}

export default UserToken
