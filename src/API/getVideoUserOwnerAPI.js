import axios from "axios";
import { getVideoOwnerUserAction } from "../redux/ActionCreators";

//ф--------------функция для асинхронного запроса
export const getVideoUserOwnerAPI  = (value) => {
    return function(dispatch) {
        if (value){
            const videoFilteredUser = axios.get(`http://127.0.0.1:8000/api/video/?author=${value}`);
            videoFilteredUser.then(response => {
                //диспатчим ActionCreator
                dispatch(getVideoOwnerUserAction(response.data)) 
    
            })
        }

    }
}


