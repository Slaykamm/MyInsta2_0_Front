import { PUT_NEW_USER_CREATE_DATA } from "../../constants/constants";
import { get } from 'lodash'


export const putNewUserDataAction = (payl) => {
    const payload = {
        id: get(payl, ['data', 'id']),
        status: payl.status
    }
    return ({type: PUT_NEW_USER_CREATE_DATA, payload})
}
