import { GET_USER_AVATAR } from "../../constants/constants";
import { get } from 'lodash'


export const getUserAvatarAction = (payl) => {
    const payload = {
        avatar: get(payl, ['data', '0', 'avatar']),
        status: payl.status
    }
    return ({type: GET_USER_AVATAR, payload})
}
