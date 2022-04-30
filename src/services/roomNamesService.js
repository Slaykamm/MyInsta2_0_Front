
export function getPrivateRoomNameFromIndexesService(id1, id2) {
    const indexes = [id1, id2]
    indexes.sort((a,b)=> a-b)
    return `@PRIVATE_${indexes[0]}_${indexes[1]}`
}


//usage const [type, index1, index2] =  getIndexesFromPrivateRoomNameService(value)
export function getIndexesFromPrivateRoomNameService(roomName){
    const arr = roomName.split('_')
    const [typeIndex, index1, index2]  = arr
    return [typeIndex, index1, index2]
}


export function getMultyUsersRoomNameFromIndexesService(indexArray) {
    const indexes = indexArray.sort((a,b)=> a-b)
    const result = '@MULTY_'+indexes.join('_')
    return [result, indexes]
}

export function getIndexesFromMultyUsersRoomNameService(roomName){
    const arr = roomName.split('_')
    const [typeIndex, ...rest]  = arr
    if (typeIndex !== '@MULTY'){
        window.alert('Не верный тип группы. Обратитесь к администратору сайта')
    }else{
        return rest
    }
}