import { IS_USER_TOKEN } from '../../constants/constants';
import { pick } from 'lodash'


//export const userTokenAction = (payload) => ({type: IS_USER_TOKEN, payload})


export const userTokenAction = (payload) => {
    const newPayload = [pick(payload, ['data', 'status'])]
    return(
        ({type: IS_USER_TOKEN, newPayload})

    )

}