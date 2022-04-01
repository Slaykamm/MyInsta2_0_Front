import axios from "axios";
import { deleteFromBaseAction } from "../redux/actions/deleteFromBaseAction";


//ф--------------функция для асинхронного запроса
export const deleteFromBaseAPI  = (id, url) => {
    return function(dispatch) {
       const putMessage = axios.delete(`http://127.0.0.1:8000/api${url}/${id}/`);
       putMessage.then(resp2 => {
            dispatch(deleteFromBaseAction(resp2))
        })
    }
}


//usage-----------

// const url = '/privaterooms'

// props.putToBase(id, url)