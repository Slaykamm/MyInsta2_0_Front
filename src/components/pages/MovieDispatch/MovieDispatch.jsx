import React from 'react';
import { useEffect } from 'react';
import cl from './MovieDispatch.module.css'
import { connect } from 'react-redux'
import { getVideoAPI } from '../../../API/getVideoAPI';
import { NavLink } from 'react-router-dom';
import { convertedFullDate } from '../../../services/dataConverter';
import { getUserDictAPI } from '../../../API/getUserDictAPI';
import { filter, get } from 'lodash'



const movieDispatch = ({
    url, 
    title, 
    id, 
    author, 
    deleteMode, 
    addToSetListFilesVideosToDelete,
    deleteFromSetListFilesVideosToDelete,
    ...props
}) => {

    useEffect(()=>{ 
        props.getUsersDict()
    },[])


   // console.log('addToSetListFilesVideosToDelete', addToSetListFilesVideosToDelete)
// TODO сделать тут чтобы было имя автора. Для этого доделать словарь юзеров сюда. И потомотфильтровать по id видео там есть ай ди автора.
    


//onChange={(e) => addToSetListFilesVideosToDelete(id)}
    function addFilesToDeleteHandle(e){

        //console.log(e)
        if (e) {
            //console.log('add', id)
            addToSetListFilesVideosToDelete(id)
        } else {
            //console.log('delete', id)
            deleteFromSetListFilesVideosToDelete(id)
        }

    }

    return (

        

        <div className={cl.ContainerConstruction + ' ' + (deleteMode ? cl.checkBoxDeleteMode : ' ')}>

            <div className={cl.checkBoxStyle}>
                <input 
                type='checkbox'
                onChange={(e) => addFilesToDeleteHandle(e.target.checked)}
                />
            </div>


            <div className={cl.InnerBlock}>
                <NavLink to={`/video/${id}`}>
                    <img src={url}/>
                </NavLink>
            </div>

            <div className={cl.InnerText}>
                <h5>Название:{title}</h5>
            </div>
            <div className={cl.InnerText}>
                <p>Автор:{get(filter(props.usersDict, {'author': author}),[0, 'username'])}</p> 
            </div>
            <div className={cl.InnerText}>          
                <p>Likes:{id}</p>
            </div>
            <div className={cl.InnerText}>          
                <p>Загружено: {convertedFullDate(props.create_at)}</p>
            </div>

        </div>
    );
};

export default connect(
    //mapStateToProps
    state => ({
       videoObject: state.getVideo,
       usersDict: state.usersDict

    }),
    //mapDispatchToProps
    dispatch => ({
        getVideoFile: () => {
            dispatch(getVideoAPI(id))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        }
        
    })


) (movieDispatch);

