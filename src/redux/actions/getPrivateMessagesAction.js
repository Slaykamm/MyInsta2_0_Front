import { GET_PRIVATE_MESSAGES } from "../../constants/constants";
import { pick } from 'lodash'


//export const userTokenAction = (payload) => ({type: IS_USER_TOKEN, payload})


export const getPrivateMessagesAction = (payload) => {
    return ({type: GET_PRIVATE_MESSAGES, payload})
}
