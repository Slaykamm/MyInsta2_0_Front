import { CHANGE_USER_PASSWORD } from "../../constants/constants";
import { get } from 'lodash'


export const changeUserPasswordAction = (payl) => {
        const payload = { 
                'message': get(payl, ['data', 'message'])
            }
    return ({type: CHANGE_USER_PASSWORD, payload})
}
