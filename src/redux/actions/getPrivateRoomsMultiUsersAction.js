import { GET_PRIVATE_ROOMS_MULTI_USERS } from '../../constants/constants'


export const getPrivateRoomsMultiUsersAction = (payload) => {
    return ({type: GET_PRIVATE_ROOMS_MULTI_USERS, payload})
}
