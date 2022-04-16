import axios from "axios";
import { createNewVideoAction } from "../redux/actions/createNewVideoAction";

//ф--------------функция для асинхронного запроса
export const createNewVideoAPI  = (payload) => {
    return function(dispatch) {

        console.log('api', payload)
        
        const createVideo = axios.post(`http://127.0.0.1:8000/api/video/`, payload);
        createVideo.then(response => {

            //диспатчим ActionCreator
            console.log('response', response)
            dispatch(createNewVideoAction(response)) 

        })
    }
}


