import { POST_TO_BASE_MEDIA } from "../../constants/constants";
import { get } from 'lodash'


export const postToBaseMediaAction = (payl) => {
    const payload = {
        id: get(payl, ['data', 'id']),
        status: payl.status
    }
    return ({type: POST_TO_BASE_MEDIA, payload})
}
