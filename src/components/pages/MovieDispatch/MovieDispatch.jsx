import React from 'react';
import { useEffect } from 'react';
import cl from './MovieDispatch.module.css'
import { connect } from 'react-redux'
import { getVideoAPI } from '../../../API/getVideoAPI';
import { NavLink } from 'react-router-dom';
import { convertedFullDate } from '../../../services/dataConverter';
import { getUserDictAPI } from '../../../API/getUserDictAPI';
import { filter, get } from 'lodash'



const movieDispatch = ({url, title, id, author, ...props}) => {

    useEffect(()=>{ 
        props.getUsersDict()
    },[])
// TODO сделать тут чтобы было имя автора. Для этого доделать словарь юзеров сюда. И потомотфильтровать по id видео там есть ай ди автора.
    
   // console.log('author', author)
   // console.log('DICT', props.usersDict)

    const test = get(filter(props.usersDict, {'id': author}),[0, 'username'])

    

    return (
        <div className={cl.ContainerConstruction}>
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

