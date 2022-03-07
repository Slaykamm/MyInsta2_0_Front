import { IS_VERIFYED_USER } from "../../constants/constants";
import { pick, get } from 'lodash'



export const verifyUserAction = (payload) => {
    const newPayload = { 
        'status': get(payload, ['status']),
        'is_active':get(payload, ['data', '0', 'is_active']) 
    }
    console.log('newPayload', newPayload)
    
    return(
        ({type: IS_VERIFYED_USER, newPayload})
    )
}
