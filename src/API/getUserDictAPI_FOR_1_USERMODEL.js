import axios from "axios";
import { getUserDictionary } from "../redux/ActionCreators";
import { filter, forEach, map, omit } from 'lodash'

//ф--------------функция для асинхронного запроса
export const getUserDictAPI  = () => {
    return function(dispatch) {
        const authorDictAPI = axios.get('http://127.0.0.1:8000/api/author/');
        authorDictAPI.then(respAuthor => {  //получаем всех авторов (аватары и телефоны) связь по pk юзера
            const securedUSerDict = []
            forEach(respAuthor.data, function(value)  {
                let securedValue = omit(value, ['password', 'is_superuser', 'is_staff', 'groups', 'user_permissions'])
                securedUSerDict.push(securedValue) // получили тут юзеров без вышеозначенных полей (для безопасности)
                
            })

            console.log("users Dict", securedUSerDict)
            dispatch(getUserDictionary(securedUSerDict))   // диспатчим словарь
            })
    }
}


