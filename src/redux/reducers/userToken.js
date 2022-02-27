import { IS_USER_TOKEN } from "../../constants/constants"

const initialState = []

function UserToken(state=initialState, action) {

    switch (action.type){
        case IS_USER_TOKEN:
            console.log('action!!!!!!!!!!', action.newPayload)
            console.log('Далее делаем условие в компоненте. Если приходит ошибка то вызываем компонент опять велкам. Видимо туда лучше передать пропс с сообщением. Типа введенные логин и пароль не верны.')
            console.log('По идее потом масштабируем это на ')
            console.log('1 Сделать вариент неверного пароля логина для логина.')
            
            console.log('Подумать: 1. Сделать регистрацию изера. Т.е. если такое имя есть то прости ввести новый логин.')
            console.log('Подумать: 2. Далее когда лоигинишься - если у тебя нет емаил и телефона переводит на личный кабинет и там надо ввести')
            console.log('3. Сделать личный кабинет с профилем юзера')

            return [...action.newPayload]

        default:
            return state
    }


}

export default UserToken
