import { IS_VERIFYED_USER } from "../../constants/constants";

const initialState = [];


function verifyUser(state=initialState, action) {

    switch (action.type) {
        case IS_VERIFYED_USER:
            return [{...action.newPayload}];
    default:
        return state
    }
}
export default verifyUser 