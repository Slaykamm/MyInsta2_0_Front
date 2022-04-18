import { postToBaseMediaAction } from "../redux/actions/postToBaseMediaAction";


//ф--------------функция для асинхронного запроса
export const postToBaseMediaAPI  = (formData, url) => {
    return function(dispatch) {
        
        
        const postMedia = fetch(url, {
            method: "POST", 
                body: formData,//JSON.stringify(data4), // data4,// // string, FormData, Blob, BufferSource или URLSearchParams
                referrer: "", // или "" для того, чтобы не послать заголовок Referer,
                // или URL с текущего источника
                referrerPolicy: "no-referrer", // no-referrer, origin, same-origin...
                mode: "cors", // same-origin, no-cors
                credentials: "same-origin", // omit, include
                cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
                redirect: "follow", // manual, error
            //  integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
                keepalive: false, // true
                signal: undefined, // AbortController, чтобы прервать запрос
                window: window // null
    })
        postMedia.then(resp => {
            if (resp.status === 200) {
                dispatch(postToBaseMediaAction(resp))
            }
        })
        postMedia.catch((err)=>{
            console.log('ERROR', err)
        })



    // usage  postToBaseAPI(formData, url)









        
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