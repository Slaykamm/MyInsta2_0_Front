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
import cl from './userVideoPage.module.css'
import MyButton from '../../../UI/MyButton/MyButton'
import NameForm from '../../../UI/LoadFIlesForm/NameForm'


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
    


    function handleSubmit(e) {
        event.preventDefault();
        let files = e.target.files
        console.log('files', files)

    }



    return (
        <>
            <Header/>
            <Menu
                value={searchQuery}
                onChange={checkTheInput}
                placeholder='Поиск в названиях'
            />
            <div >

                    {filteredVideo.length 
                    ? <div >
                        <VideoContainer
                            listFiles={userVideoList}
                            filteredVideo={filteredVideo}
                        />    
                    </div>
                    : <div>
                        <h3 className={cl.VideoInfo}> К сожалению, пока нет Ваших видео</h3>
                    </div>
                    }

     



                <h3 className={cl.VideoInfo}>Интерфейс загрузки видеороликов:</h3>
                <div className={cl.VideoLoadingLayer}>
                            <div className={cl.InnerContainer} style={{backgroundColor:'red'}}>1</div>
                            <div className={cl.InnerContainer} style={{backgroundColor:'green'}}>2</div>
                            <div className={cl.InnerContainer}>
                                <NameForm
                                handleSubmit={handleSubmit}
                                />
                            </div>
                            <div className={cl.InnerContainer}><MyButton >222222222222222</MyButton> </div>
                            <div className={cl.InnerContainer}><span>видео загружено</span></div>
                            <div className={cl.InnerContainer}><span>картинка загружена</span></div>
                </div>
         



            </div> 
      


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