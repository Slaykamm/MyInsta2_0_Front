import React from 'react';
import { useEffect } from 'react';
import cl from './MovieDispatch.module.css'
import { connect } from 'react-redux'
import { getVideoAPI } from '../../../../../API/getVideoAPI';
import { NavLink } from 'react-router-dom';
import { convertedFullDate } from '../../../../../services/dataConverter';
import { getUserDictAPI } from '../../../../../API/getUserDictAPI';
import { filter, get } from 'lodash'


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

const movieDispatch = ({
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

    useEffect(()=>{ 
        props.getUsersDict()
    },[])

    function addFilesToDeleteHandle(e){
        if (e) {
            addToSetListFilesVideosToDelete(id)
        } else {
            deleteFromSetListFilesVideosToDelete(id)
        }
    }

    const testClick = () => console.log('test click on author')

    return (
        <div className={cl.ContainerConstruction + ' ' + (deleteMode ? cl.checkBoxDeleteMode : ' ')}>

            <div className={cl.checkBoxStyle}>
                <input 
                placeholder='MarkFilesToDelete'
                type='checkbox'
                onChange={(e) => addFilesToDeleteHandle(e.target.checked)}
                />
            </div>



            <div className={cl.InnerText}>
                <h5><span>Название: </span>{title}</h5>
            </div>

            <div className={cl.InnerBlock}>
                <NavLink to={`/video/${id}`}>
                    <img src={url} alt='LinkToFullVideo'/>
                </NavLink>
            </div>
          <div className={cl.InnerText}>
                <h5><span>Описание: </span> {description}</h5>
            </div>
 
            <div className={cl.InnerText}>
                <h5
                    onClick={testClick}
                    className={cl.AuthorHover}
                ><span
                >Автор: </span>{get(filter(props.usersDict, {'author': author}),[0, 'username'])}</h5> 
            </div>
            <div className={cl.InnerText}>          
                <h5><span>Загружено: </span> {convertedFullDate(props.create_at)}</h5>
            </div>

        </div>
    );
};

export default connect(
    state => ({
       videoObject: state.getVideo,
       usersDict: state.usersDict
    }),
    dispatch => ({
        getVideoFile: () => {
            dispatch(getVideoAPI(id))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        }
    })
) (movieDispatch);

