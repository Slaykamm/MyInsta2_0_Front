import axios from "axios";
import { getVideoAction } from "../redux/ActionCreators";

//ф--------------функция для асинхронного запроса
export const getVideoAPI  = (value) => {
    return function(dispatch) {
        const videoPreviewsAPI = axios.get(`http://127.0.0.1:8000/api/video/${value}`);
        videoPreviewsAPI.then(response => {

            //диспатчим ActionCreator

            dispatch(getVideoAction(response.data)) 

        })
    }
}


