import axios from "axios";
import { userTokenAction } from '../redux/actions/userTokenAction'

//ф--------------функция для асинхронного запроса
export const getUserTokenAPI  = (userData) => {
    return function(dispatch) {

        const header = {
            'Content-Type': 'application/json'
        }

        
        const logingPostAPI = axios.post('http://127.0.0.1:8000/auth/login/', userData, header);
        logingPostAPI.then(response => {
            //диспатчим ActionCreator
            dispatch(userTokenAction(response)) 
        })

        logingPostAPI.catch((err) => {
            console.log('ERRROR', err.response)
            dispatch(userTokenAction(err.response))
        })


    }
}


