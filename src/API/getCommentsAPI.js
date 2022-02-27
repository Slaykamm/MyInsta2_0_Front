import axios from "axios";
import { getCommentsAction } from "../redux/actions/getCommentsAction";


//ф--------------функция для асинхронного запроса
export const getCommentsThunkAPI = (videoID, userToken) => {
    return function(dispatch) {


        const params = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken                    
            }
        }

        const commentsAPI = axios.get(
            `http://127.0.0.1:8000/api/comments/?video=${videoID}`, params);
                   
        commentsAPI.then(response => {
            //диспатчим ActionCreator
            dispatch(getCommentsAction(response)) 
        })

        commentsAPI.catch((err) => {
            console.log("mi tut?")
              dispatch(getCommentsAction(err.response))

              
        })



    




    }
}


