import axios from "axios";
import { postToBaseAction } from "../redux/actions/postToBaseAction";


//ф--------------функция для асинхронного запроса
export const postToBaseAPI  = (message, url) => {
    return function(dispatch) {
       const putMessage = axios.post(`http://127.0.0.1:8000/api${url}/`, message);
       putMessage.then(resp2 => {
            console.log('resp', resp2)
            dispatch(postToBaseAction(resp2))
        })
    }
}

// 
//usage----------- Возвращает ID, который потом используется на фронте для добавления. Это важно!!!!!
// props.postToBaseAPI(message, url)
// {
//     "text": "И Мне!",
//     "rating": 0,
//     "create_at": "2022-03-24T21:07:35.340028Z",
//     "author": 6,
//     "video": 1
// }