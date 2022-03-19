import { createSelector } from "reselect"
import { filter, get, difference } from 'lodash'


export const getUsersDict = (state) => {
    return state.usersDict
} 

export const getPrivateRooms = (state) => {
    if (state){
        return state.getPrivateRooms
    }
} 

export const getActualUserInfo = createSelector(
    getUsersDict,
    (usersDict) => {
        const actualUserName = filter(usersDict, {'username':localStorage.getItem('SLNUserName')})
        return actualUserName
    }
)

export const getAnotherChatMatesID = createSelector(
    getPrivateRooms, 
    getActualUserInfo,
    (
    users,
    actualUser
    ) => {
        const anotherChatMatesID = []
        users.map(user => {
            anotherChatMatesID.push(
                {
                    'privateChatID': user.id, 
                    'anotherChatMate': difference(get(user, ['privateRoomMembers']), [get(actualUser, [0, 'id'])])[0]
                })
        })
        return anotherChatMatesID    
    }
  )

//TODO нормализовать имена групп хорошобы написать селектор, где бы на основании данных из групп погружались бы данные по чатам.


export const getPrivateMessages = (state) => {
    if (state){
        return state.privateRoomMessages
    }
} 