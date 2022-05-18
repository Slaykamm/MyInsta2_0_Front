import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import cl from './MovieDispatch.module.css'
import { connect } from 'react-redux'
import { getVideoAPI } from '../../../../../API/getVideoAPI';
import { NavLink } from 'react-router-dom';
import { convertedFullDate } from '../../../../../services/dataConverter';
import { getUserDictAPI } from '../../../../../API/getUserDictAPI';
import { filter, get } from 'lodash'
import MyPrivateWhispModule from '../../../../../modules/MyPrivateWhispModule/MyPrivateWhispModule';
import { getPrivateRooms } from '../../../../../redux/Selectors/privateRoomsSelector'
import { getPrivateRoomsAPI } from '../../../../../API/getPrivateRoomsAPI'
import { getUsersDict } from '../../../../../redux/Selectors/baseSelectors'


interface IMovieDispatch {
    url: string, 
    title: string, 
    description: string,
    id: number, 
    author: string, 
    deleteMode: void, 
    addToSetListFilesVideosToDelete: void,
    deleteFromSetListFilesVideosToDelete: void,
    props: object
}

const _movieDispatch = ({
    url, 
    title, 
    description,
    id, 
    author, 
    deleteMode, 
    addToSetListFilesVideosToDelete,
    deleteFromSetListFilesVideosToDelete,
    ...props
}) => {

    //console.log('_movieDispatch 9 RENDERS')

    const usersDict = JSON.parse(window.localStorage.getItem('usersDict'))
    
    // if (!usersDict.length) {
    //     props.getUsersDict()  
    // }
    // useEffect(() => {
    //     window.localStorage.setItem('usersDict', JSON.stringify(props.usersDict))
    // }, [props.usersDict])



    function addFilesToDeleteHandle(e: Event){
        if (e) {
            addToSetListFilesVideosToDelete(id)
        } else {
            deleteFromSetListFilesVideosToDelete(id)
        }
    }


    // Private message s
    const [userForNewChat, setUserForNewChat] = useState()

    function callModalForPrivate(user){


        props.getPrivateRooms(user)
        setUserForNewChat(user)

    } 


    return (
        <>
            {userForNewChat
            ?   <div>

                <MyPrivateWhispModule 
                userForNewChat={userForNewChat}
                usersDict={usersDict}
                usersPrivateRooms={props.usersPrivateRooms}
                />  
                </div>
            :   <span></span>
            }





            <div className={cl.ContainerConstruction + ' ' + (deleteMode ? cl.checkBoxDeleteMode : ' ')}>

                <div className={cl.checkBoxStyle}>
                    <input 
                    placeholder='MarkFilesToDelete'
                    type='checkbox'
                    onChange={(e) => addFilesToDeleteHandle(e.target.checked)}
                    />
                </div>





                <div className={cl.InnerBlock}>
                    <NavLink to={`/video/${id}`}>
                        <img src={url} alt='LinkToFullVideo'/>
                    </NavLink>
                </div>

            <div className={cl.InnerText}>
                <h5><span>Название: </span>{title}</h5>
            </div>
            <div className={cl.InnerText}>
                    <h5><span>Описание: </span> {description}</h5>
                </div>
    
                <div className={cl.InnerText}>
                    <h5
                        onClick={() => callModalForPrivate(author)}
                        className={cl.AuthorHover}
                    ><span
                    >Автор: </span>{get(filter(usersDict, {'id': author}),[0, 'username'])}</h5> 
                </div>
                <div className={cl.InnerText}>   
                    <div >
                        <h5 ><span>Загружено: </span> {convertedFullDate(props.create_at)}</h5>
                    </div>       
                </div>

            </div>
        </>
    );
};

const movieDispatch = React.memo(_movieDispatch)
export default connect(
    state => ({
       videoObject: state.getVideo,
       usersDict: getUsersDict(state),
       usersPrivateRooms: getPrivateRooms(state),
    }),
    dispatch => ({
        getVideoFile: () => {
            dispatch(getVideoAPI(id))
        },
        getPrivateRooms: (value) => {
            dispatch(getPrivateRoomsAPI(value))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        },
        
    })
) (movieDispatch);

