import axios from "axios";
import { getPreviewAPI } from "../redux/ActionCreators";

//ф--------------функция для асинхронного запроса
export const getVideoPreviewsAPI  = () => {
    return function(dispatch) {
        const videoPreviewsAPI = axios.get('http://127.0.0.1:8000/api/video/');
        videoPreviewsAPI.then(response => {

            //диспатчим ActionCreator
            dispatch(getPreviewAPI(response.data)) 

        })
    }
}


