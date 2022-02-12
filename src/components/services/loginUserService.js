
export function userCheckProcessingService(userInfo, isActualUser){
    const checkUserLogin = userInfo.filter(userName=>(userName.username == (isActualUser['UserLogin'])))
    if (checkUserLogin.length){
        const checkUserPassword = _.get(checkUserLogin,[0, 'id']) == isActualUser['UserPassword']
        if (checkUserPassword) {
            console.log("И пароль есть!")
            return true
        }
        else {
            console.log("Пароль не верный!")
            return false
        }
    }
    else{
        console.log("Данный пользователь отстутствует")
        return false
    }

}

