import React from 'react'

import cl from './userVideoLoadingForm.module.css'
import NameForm from '../../../../UI/LoadFIlesForm/NameForm'
import button from '../../../../UI/MyButton/MyButton'

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

    ...props}) {

        function submitVideoLoadingForm(e){
            console.log('disable', disabled)
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
                        <span><img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='avatar'/></span>
                    </div>
                    <div className={cl.InnerContainer}>
                        <span><img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='avatar'/></span>
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
                    <div className={cl.InnerContainer}><span>видео загружено</span></div>
                    <div className={cl.InnerContainer}><span>превью загружено</span></div>
                </div>
            </div>

            <button
                onClick={e=>submitVideoLoadingForm(e)}
                disabled={!disabled}
            >Загрузить видео</button>     
        </>

    )
}

export default UserVideoLoadingForm
