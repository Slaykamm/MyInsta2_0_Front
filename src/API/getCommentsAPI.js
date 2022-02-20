import axios from "axios";
import { getCommentsAPI } from "../redux/ActionCreators";

//ф--------------функция для асинхронного запроса
export const getCommentsThunkAPI = () => {
    return function(dispatch) {
        const commentsAPI = axios.get('http://127.0.0.1:8000/api/comments/');
        commentsAPI.then(response => {

            //диспатчим ActionCreator
            dispatch(getCommentsAPI(response.data)) 

        })
    }
}


