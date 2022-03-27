import { POST_USER_ROOM } from "../../constants/constants";




export const postUserRoomAction = (payl) => {
    const payload = payl.status
    return ({type: POST_USER_ROOM, payload})
}