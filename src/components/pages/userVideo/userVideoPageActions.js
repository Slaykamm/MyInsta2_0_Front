import { useState, useEffect } from 'react'
import { get, filter } from 'lodash' 


export function createNewVideoAction( queryVideoInput, queryDescriptionInput, usersDict,  propsCreateNewVideo){

    console.log('here')
    const payload = {
        "title": queryVideoInput + Date.now(),
        "description": queryDescriptionInput + Date.now(),
        "create_at": Date.now(),
        "rating": 0,
        "author": get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id'])
    }
    propsCreateNewVideo(payload)
}



/**
* Закидывает видео из формы на Бэк
* @param { files, files, id, postToBaseMedia } name    Name of the user
*/

export function submitVideoAction(files, id, postToBaseMedia){

    var formData = new FormData;
    formData.append('videofile', files[0]);
        const url = `http://127.0.0.1:8000/api/video/${id}/`
        postToBaseMedia(formData, url)
        
}