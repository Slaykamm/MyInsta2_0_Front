export function getPrivateRoomNameFromIndexesService(id1, id2) {
    const indexes = [id1, id2]
    indexes.sort((a,b)=> a-b)
    return `@PRIVATE_${indexes[0]}_${indexes[1]}`
    //TODO для расширения чатов с 2х чел до необграниченного имя комнаты надо делать так: получаем args. делаем массив. сортируем. идем по порядку и добавляем как внизу только красивее.
}


//usage const [type, index1, index2] =  getIndexesFromPrivateRoomNameService(value)
export function getIndexesFromPrivateRoomNameService(roomName){
    const arr = roomName.split('_')
    const [typeIndex, index1, index2]  = arr
    return [typeIndex, index1, index2]
}

