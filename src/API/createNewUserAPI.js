import { createEmptyUserAction } from "../redux/actions/createEmptyUserAction";
import axios from "axios";
import { get } from 'lodash'


//ф--------------функция для асинхронного запроса
export const createNewUserAPI  = () => {
    return function(dispatch) {

        
        const user = {
            "username": `empty${Date.now()}`,
            "password1":"qwe+12345",
            "password2":"qwe+12345",
            "email":`empty${Date.now()}@mail.ru`
        }

        console.log('step1: user', user)
        const creatUser = axios.post('http://127.0.0.1:8000/auth/registration/', user)

        creatUser.then(resp => {

            console.log('step2: create user result', resp)
            const getId = axios.get(`http://127.0.0.1:8000/api/users/?username=${user.username}`)

            getId.then(respID =>{
                console.log('respID', respID)
                const id = get(respID, ['data', '0', 'id'])
                console.log('step3: new user ID', respID)

                const author = {
                   // "avatar": null,
                    "phone": `${Date.now()}`,
                    "name": id
                }

                console.log('step4: new author ', author)
                const makeAuthor = axios.post('http://127.0.0.1:8000/api/author/', author)

                makeAuthor.then(newAuthorResp => {
                    console.log('step4: new author ', newAuthorResp)

                        dispatch(createEmptyUserAction(newAuthorResp))
                })

                makeAuthor.catch((err) => {
                    console.log('ERRROR', err.response)
                   // dispatch(verifyUserAction(err.response))

                })

            })
        })
    }
}
