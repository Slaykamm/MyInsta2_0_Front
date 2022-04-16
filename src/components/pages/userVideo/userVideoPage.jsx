import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Menu from '../../../modules/Menu/Menu'
import Header from '../header/Header'
import { filterQuery } from '../../../services/filterQuery'
import VideoContainer from '../main/VideoContainer/VideoContainer'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { createNewVideoAPI } from '../../../API/createNewVideoAPI'
import { get, filter } from 'lodash'
import cl from './userVideoPage.module.css'
import MyButton from '../../../UI/MyButton/MyButton'
import MyRedButton from '../../../UI/MyRedButton/MyRedButton'
import MyModal from '../../../UI/MyModal/MyModal'
import UserVideoLoadingForm from './userVideoLoadingForm/userVideoLoadingForm'
import { getNewVideoResult, getDeleteFromBaseResult, getPostToBaseMediaResult } from '../../../redux/Selectors/baseSelectors'
import { deleteFromBaseAPI } from '../../../API/deleteFromBaseAPI'
import { postToBaseMediaAPI} from '../../../API/postToBaseMediaAPI'
import { getVideoUserOwnerAPI } from '../../../API/getVideoUserOwnerAPI'

import { createNewVideoAction, submitVideoAction } from './userVideoPageActions'


function UserVideoPage(props) {

    const [userVideoList, setUserVideoList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [userID, setUserID] = useState('')
    const [loadingVideoActive, setLoadingVideoActive] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [listFilesVideosToDelete, setListFilesVideosToDelete] = useState([])
    
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [isFormCorrect, setIsFormCorrect] = useState(false)

    // получаем словарь
    useEffect(()=>{
        if (!props.usersDict.length){
           props.getUsersDict() 
        }
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
    



    function modalActivation(e) {
        e.preventDefault()
        setDeleteMode(false)
        setLoadingVideoActive(true)
    }

    const [queryVideoInput, setQueryVideoInput] = useState('')
    const [queryDescriptionInput, setQueryDescriptionInput] = useState('')
    const [videoToAddId, setVideoToAddId] = useState({})



    
    //  action СОЗДАНИЯ ПУСТОГО РОЛИКА 
    function createNewVideo(e){
           e.preventDefault()
           createNewVideoAction(queryVideoInput, queryDescriptionInput, props.usersDict, props.createNewVideo)
     }


// ========================видео сабмит

        
        function submitVideo(e){
            e.preventDefault();

            let files = e.target.files
            submitVideoAction(files, props.newVideoResult.id, props.postToBaseMedia)

            setIsVideoLoaded(true)
        }
            

        // {
        //     setQueryVideoInput('')
        //     setQueryDescriptionInput('')
        //     setLoadingVideoActive(false)
        // }


            // обработка загрузки превью ------------------------------------------------
            function handlePreviewSubmit(e) {
                e.preventDefault();
                let files = e.target.files
                console.log('files', files[0])

                var formData = new FormData;
                formData.append('imagefile', files[0]);

                    const url = `http://127.0.0.1:8000/api/video/${props.newVideoResult.id}/`
                    console.log('url', url)
                    props.postToBaseMedia(formData, url)

                    setIsImageLoaded(true)
            }



            
            useEffect(()=> {
                if (props.postToBaseMediaResult.status === 200){
                    //window.location.reload();
                    console.log('превью ок')
                }
            }, [props.postToBaseMediaResult])
        


        function deleteModeEnable(e){
            console.log('e', e)
            e.preventDefault();
            setDeleteMode(true)
        }

        function cancelDeleteMode(e){
            e.preventDefault();
            setDeleteMode(false)
            setListFilesVideosToDelete([])
        }

        function addToSetListFilesVideosToDelete(id){
            setListFilesVideosToDelete([...listFilesVideosToDelete,  {'id': id}])
        }

        function deleteFromSetListFilesVideosToDelete(id){
            setListFilesVideosToDelete(listFilesVideosToDelete.filter(file => file.id !== id))
        }
 

        function deleteVideo () {
            var videoList = userVideoList


            for (let i = 0; i<listFilesVideosToDelete.length; i++){
                var videoList = videoList.filter(video => listFilesVideosToDelete[i].id !== video.id)
            }
            setUserVideoList(videoList)

            const url = '/video'
            listFilesVideosToDelete.forEach(id =>{
                props.deleteFromBase(id.id, url)
            })

            setListFilesVideosToDelete([])

        }

        


    return (
        <>
            <Header/>
            <Menu
                value={searchQuery}
                onChange={checkTheInput}
                placeholder='Поиск в названиях'
            />

            <div className={cl.ControlBtnGroup}>
                <div className={cl.ControlBtnNameContainer}>
                    <div className={cl.loadingButton}>
                        <MyButton
                            onClick={modalActivation}
                        >Загрузить новые видео</MyButton>
                    </div>

                    <div className={cl.DeleteModeONButton}>
                        <MyButton
                            onClick={e => deleteModeEnable(e)}
                        >Пометить файлы на удаление</MyButton>
                    </div>

                    <div className={cl.DeleteModeOFFButton}>
                        <MyButton
                            onClick={cancelDeleteMode}
                        >Выключить режим удаления</MyButton>
                    </div>

                    {listFilesVideosToDelete.length > 0
                    ?
                    <div className={cl.DeleteButton}>
                        <MyRedButton
                            onClick={deleteVideo}

                        >Удалить {listFilesVideosToDelete.length} видео </MyRedButton>
                    </div>
                    : <div></div>
                    }
                </div>
            </div>




                <div className={cl.PaddingForVideoAtUsersPage}>
                    {filteredVideo.length 
                    ? <div >
                        <VideoContainer
                            listFiles={userVideoList}
                            filteredVideo={filteredVideo}
                            deleteMode={deleteMode}
                            addToSetListFilesVideosToDelete={addToSetListFilesVideosToDelete}
                            deleteFromSetListFilesVideosToDelete={deleteFromSetListFilesVideosToDelete}
                            
                        />    
                    </div>
                    : <div>
                        <h3 className={cl.VideoInfo}> К сожалению, пока нет Ваших видео</h3>
                    </div>
                    }
                </div> 

            <MyModal
                visible={loadingVideoActive}
                setVisible={setLoadingVideoActive}
            >

                {/* TODO костыль на создание видео */}
                <MyButton
                onClick={e => createNewVideo(e)}
                > 
                    Create New Video 
                </MyButton>

                    <UserVideoLoadingForm
                        queryVideoInput={queryVideoInput}
                        setQueryVideoInput={setQueryVideoInput}
                        queryDescriptionInput={queryDescriptionInput}
                        setQueryDescriptionInput={setQueryDescriptionInput}
                        submitVideo={submitVideo}
                        handlePreviewSubmit={handlePreviewSubmit}
                        disabled={isVideoLoaded && isImageLoaded}
                    />
                </MyModal>
        </>
    )
}


export default connect(
    // mapStateToProps
    state => ({
        videoUserOwnerPreviews: state.videoOwnerUser,
        usersDict: state.usersDict,
        newVideoResult: getNewVideoResult(state),
        deleteToBaseResult: getDeleteFromBaseResult(state),
        postToBaseMediaResult: getPostToBaseMediaResult(state),
    }),

    //mapDispatchToProps
    dispatch => ({
        getUserOwnerPreview: (value) =>{
            dispatch(getVideoUserOwnerAPI(value))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        },
        createNewVideo: (payload) => {
            dispatch(createNewVideoAPI(payload))
        },
        deleteFromBase: (id, url) => {
            dispatch(deleteFromBaseAPI(id, url))
        },
        postToBaseMedia: (formData, url) => {
            dispatch(postToBaseMediaAPI(formData, url))
        }, 
    })




)(UserVideoPage); 