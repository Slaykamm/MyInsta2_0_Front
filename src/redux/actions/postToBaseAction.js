import { POST_TO_BASE } from "../../constants/constants";
import { get } from 'lodash'


export const postToBaseAction = (payl) => {
    const payload = {
        id: get(payl, ['data', 'id']),
        status: payl.status
    }
    return ({type: POST_TO_BASE, payload})
}
