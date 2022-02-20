import axios from "axios";
import { getUserDictionary } from "../redux/ActionCreators";
import { forEach, omit } from 'lodash'

//ф--------------функция для асинхронного запроса
export const getUserDictAPI  = () => {
    return function(dispatch) {
        const userDictAPI = axios.get('http://127.0.0.1:8000/api/author/');
        userDictAPI.then(response => {

            const secureDict = []
            forEach(response.data, function(value)  {
                let securedValue = omit(value, ['password'])
                secureDict.push(securedValue)
            })
            dispatch(getUserDictionary(secureDict)) 

        })
    }
}


