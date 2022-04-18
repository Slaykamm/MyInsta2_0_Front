import axios from "axios";
import { getVideoAction } from "../redux/ActionCreators";

//ф--------------функция для асинхронного запроса
export const getVideoAPI  = (id) => {
    return function(dispatch) {
        const videoPreviewsAPI = axios.get(`http://127.0.0.1:8000/api/video/${id}`);
        videoPreviewsAPI.then(response => {

            //диспатчим ActionCreator

            dispatch(getVideoAction(response.data)) 

        })
    }
}


