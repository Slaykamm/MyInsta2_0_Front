import { CREATE_EMPTY_USER } from "../../constants/constants";
import { get } from 'lodash'


export const createEmptyUserAction = (payl) => {
    const payload = {
        id: get(payl, ['data', 'id']),
        status: payl.status
    }
    console.log('payload', payload)
    return ({type: CREATE_EMPTY_USER, payload})
}
