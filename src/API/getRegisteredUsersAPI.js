import axios from "axios";
import { setThunkResteredUsersData } from "../redux/ActionCreators";

//ф--------------функция для асинхронного запроса
export const getRegisteredUsersAPI  = () => {
    return function(dispatch) {
        const registeredUsersAPI = axios.get('https://jsonplaceholder.typicode.com/users');
        registeredUsersAPI.then(response => {

            //диспатчим ActionCreator
            dispatch(setThunkResteredUsersData(response.data)) 
            console.log('ZAEBIS`!', response.data)
        })
    }
}


