import { PUT_NEW_USER_CREATE_DATA } from "../../constants/constants";




export const putNewUserData = (payl) => {
    const payload = payl.status
    return ({type: PUT_NEW_USER_CREATE_DATA, payload})
}