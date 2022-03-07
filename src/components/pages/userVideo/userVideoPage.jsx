import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getVideoUserOwnerAPI } from '../../../API/getVideoUserOwnerAPI'

import Menu from '../../../modules/Menu/Menu'
import Header from '../header/Header'
import MainPage from '../main/MainPage'
import { filterQuery } from '../../../services/filterQuery'
import VideoContainer from '../main/VideoContainer/VideoContainer'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { get, filter } from 'lodash'


function UserVideoPage(props) {

    const [userVideoList, setUserVideoList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [userID, setUserID] = useState('')

    // получаем словарь
    useEffect(()=>{
       props.getUsersDict() 
    },[])


    useEffect(()=>{
        setUserID(get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'id']))
    }, [props.usersDict])


    useEffect(()=>{
        props.getUserOwnerPreview(userID)


    }, [userID])
    
    useEffect(()=>{
        setUserVideoList(props.videoUserOwnerPreviews)
    },[props.videoUserOwnerPreviews])



    // Блок фильтрации роликов//////////////////////////////////////////
    function checkTheInput(event){
        setSearchQuery(event.target.value)
    }


    const filteredVideo=filterQuery(userVideoList, searchQuery)
    // ВСЕ

    return (
        <>
            <Header/>
            <Menu
                value={searchQuery}
                onChange={checkTheInput}
                placeholder='Поиск в названиях'
            />
            {/* <h3 style={{paddingTop:'10rem'}}>Загруженные Вами видео:</h3> */}

            <VideoContainer
                listFiles={userVideoList}
                filteredVideo={filteredVideo}
            />


        </>
    )
}


export default connect(
    // mapStateToProps
    state => ({
        videoUserOwnerPreviews: state.videoOwnerUser,
        usersDict: state.usersDict,
    }),

    //mapDispatchToProps
    dispatch => ({
        getUserOwnerPreview: (value) =>{
            dispatch(getVideoUserOwnerAPI(value))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        },

    })




)(UserVideoPage); 