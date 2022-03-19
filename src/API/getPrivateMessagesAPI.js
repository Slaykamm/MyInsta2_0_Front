import axios from "axios";
import { getPrivateMessagesAction } from "../redux/ActionCreators";

//ф--------------функция для асинхронного запроса
export const getPrivateMessagesAPI  = (value) => {
    return function(dispatch) {
        const privateMessages = axios.get(`http://127.0.0.1:8000/api/prvatemessages/?privateRoom=${value}`);
        privateMessages.then(response => {

            //диспатчим ActionCreator

            dispatch(getPrivateMessagesAction(response.data)) 

        })
    }
}


