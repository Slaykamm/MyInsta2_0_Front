import React from 'react'
import { get } from 'lodash'
import cl from './userVideoLoadingForm.module.css'
import NameForm from '../../../../UI/LoadFIlesForm/NameForm'
import MyButton from '../../../../UI/MyButton/MyButton'

function UserVideoLoadingForm({
    handleAvatarSubmit,
    queryVideoInput,
    setQueryVideoInput,
    queryDescriptionInput,
    setQueryDescriptionInput,
    submitVideo,
    handlePreviewSubmit,
    submitVideoLoadingForm,
    disabled,
    submitAddNewVideoForm,
    videoObject,

    ...props}) {

        function submitVideoLoadingForm(e){
            console.log('disable', disabled)
            submitAddNewVideoForm()
        }

    return (
        <>
            <div className={cl.videoLoadingInterface}>
                <h3 className={cl.VideoInfo}>Интерфейс загрузки видеороликов:</h3>
                <div className={cl.VideoLoadingLayer}>
                    <div>Наименование Ролика:</div>
                    <div>Описание Ролика</div>
                    <div>
                        <input
                            value={queryVideoInput}
                            onChange={e=>setQueryVideoInput(e.target.value)}            
                    /></div>
                    <div>
                        <input
                            value={queryDescriptionInput}
                            onChange={e=>setQueryDescriptionInput(e.target.value)}
                        /></div>
                    <div className={cl.InnerContainer} >
                        {/* <span><img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='avatar'/></span> */}

                    {get(videoObject,['video']) 
                            ? <span><img src='http://127.0.0.1:8000/media/avatar/VideoLoaded.jpg' alt='video'/></span>
                            : <span><img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='video'/></span>
                        }

                    </div>


                    <div className={cl.InnerContainer}>
                    {get(videoObject,['image']) 
                            ? <span> <img src={get(videoObject,['image'])}/></span>
                            : <span><img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='preview'/></span>
                        }
                    </div>
                    
                    <div className={cl.InnerContainer}>
                        <NameForm
                        handleSubmit={submitVideo}
                        />
                    </div>
                    <div className={cl.InnerContainer}>
                        <NameForm
                        handleSubmit={handlePreviewSubmit}
                        />
                    </div>
                    <div className={cl.InnerContainer}><span>Загрузка Видео</span></div>
                    <div className={cl.InnerContainer}><span>Загрузка Превью</span></div>
                </div>
            </div>

            <MyButton
                onClick={e=>submitVideoLoadingForm(e)}
                disabled={!disabled}
            >Загрузить видео</MyButton>     
        </>

    )
}

export default UserVideoLoadingForm
