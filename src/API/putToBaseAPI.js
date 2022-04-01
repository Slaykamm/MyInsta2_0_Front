import axios from "axios";
import { putToBaseAction } from "../redux/actions/putToBaseAction";


//ф--------------функция для асинхронного запроса
export const putToBaseAPI  = (message, url, id) => {
    return function(dispatch) {
        console.log('message', message)
        console.log('id', id)
        console.log('url', url)
        console.log('ht', `http://127.0.0.1:8000/api${url}/${id}/`)

        
        
       const putMessage = axios.patch(`http://127.0.0.1:8000/api${url}/${id}/`, message);
       putMessage.then(resp2 => {
            console.log('resp', resp2)
            dispatch(putToBaseAction(resp2))
        })
    }
}


//usage-----------
// const message = {
//     "lastOpenDate": new Date().toISOString() 
// }

// const url = '/privaterooms'

// props.putToBase(message, id, url)