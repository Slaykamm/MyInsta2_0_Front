import { createSelector } from "reselect"
import { filter, get, difference, remove, flatten } from 'lodash'


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


export const getAnotherChatMatesMultyUsersID = createSelector(
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
                    'anotherChatMate': difference(get(user, ['privateRoomMembers']), [get(actualUser, [0, 'id'])])
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

export const getPrivateMessageByRoomID = (state, ID) => {
    const allMessagesArray = state.privateRoomMessages
    const roomID = ID

    const filtererPickedRoomID = allMessagesArray.map(rooms => {
            if (get(rooms, [0, 'id']) === roomID){
                return rooms
            }

        })
        return flatten(remove(filtererPickedRoomID, undefined)) 

}


// export const getPrivateMessageByRoomID = createSelector(
//     getPrivateMessages,
//     (allMessagesArray
//         )=> {
            

           
//             const roomID = 1
//             const filtererPickedRoomID = allMessagesArray.map(rooms => {
//                     console.log('rrrrr', rooms)
//                     console.log('222222', get(rooms, [0, 'id']))
//                     if (get(rooms, [0, 'id']) === roomID){
//                         return rooms
//                     }
//             })

//          //console.log('filtererPickedRoomID', filtererPickedRoomID.filter(romm => romm !== undefined))
//          //console.log('123', flatten(remove(filtererPickedRoomID, undefined)))
//             return flatten(remove(filtererPickedRoomID, undefined))  
//          //   return   filtererPickedRoomID.filter(romm => romm !== undefined)    
//         }
// )