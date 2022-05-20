import axios from "axios";
import { getUserAvatarAction } from '../redux/actions/getUserAvatarAction'
//ф--------------функция для асинхронного запроса
export const getUserAvatarAPI  = (id) => {
    return function(dispatch) {
        console.log('http://127.0.0.1:8000/api/author/?id=${id}', `http://127.0.0.1:8000/api/author/?id=${id}`)       
        const getAvatar = axios.get(`http://127.0.0.1:8000/api/author/?id=${id}`);
        getAvatar.then(response => {

            console.log('response', response)
            dispatch(getUserAvatarAction(response)) 

        })
    }
}


