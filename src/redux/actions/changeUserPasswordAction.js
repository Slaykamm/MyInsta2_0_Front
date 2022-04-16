import { CHANGE_USER_PASSWORD } from "../../constants/constants";
import { get } from 'lodash'


export const changeUserPasswordAction = (payl) => {
        console.log('pay', payl)
        const payload = { 
                'message': get(payl, ['data', 'message']),
                'status': payl.status
            }
    return ({type: CHANGE_USER_PASSWORD, payload})
}
