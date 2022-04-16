import { CREATE_NEW_VIDEO } from "../../constants/constants";
import { get } from 'lodash'


export const createNewVideoAction = (payl) => {
    const payload = {
        id: get(payl, ['data', 'id']),
        status: payl.status
    }
    return ({type: CREATE_NEW_VIDEO, payload})
}
