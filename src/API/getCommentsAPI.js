import axios from "axios";
import { getCommentsAPI } from "../redux/ActionCreators";

//ф--------------функция для асинхронного запроса
export const getCommentsThunkAPI = (value) => {
    return function(dispatch) {
        const commentsAPI = axios.get(`http://127.0.0.1:8000/api/comments/?video=${value}`);
                            
        commentsAPI.then(response => {

            //диспатчим ActionCreator

            dispatch(getCommentsAPI(response.data)) 

        })
    }
}


