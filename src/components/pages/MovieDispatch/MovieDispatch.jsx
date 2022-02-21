import React from 'react';
import cl from './MovieDispatch.module.css'
import { connect } from 'react-redux'
import { getVideoAPI } from '../../../API/getVideoAPI';
import { NavLink } from 'react-router-dom';



const movieDispatch = ({url, title, id, ...props}) => {


    return (
        <div className={cl.ContainerConstruction}>
            <div className={cl.InnerBlock}>
                <NavLink to={`video/${id}`}>
                    <img src={url}/>
                </NavLink>
            </div>

            <div className={cl.InnerText}>
                <p>Title:{title}</p>
            </div>
            <div className={cl.InnerText}>
                <p>Description:{id}</p> 
            </div>
            <div className={cl.InnerText}>          
                <p>Likes:{id}</p>
            </div>


        </div>
    );
};

export default connect(
    //mapStateToProps
    state => ({
       videoObject: state.getVideo 
    }),
    //mapDispatchToProps
    dispatch => ({
        getVideoFile: () => {
            dispatch(getVideoAPI(id))
        },
        
    })


) (movieDispatch);

