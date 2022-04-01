import { POST_USER_MESSAGE } from "../../constants/constants";


export const postUserPrivateAction = (payl) => {
    const payload = payl.status
    console.log('11111', payload)
    return ({type: POST_USER_MESSAGE, payload})
}