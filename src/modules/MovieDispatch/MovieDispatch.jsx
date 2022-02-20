import React from 'react';
import { useParams } from 'react-router-dom';
import cl from './MovieDispatch.module.css'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import videoPostPage from '../../components/pages/videoPage/videoPostPage';
import Nav from 'react-bootstrap/Nav'
import { getVideoAPI } from '../../API/getVideoAPI';
import { NavLink } from 'react-router-dom';



const movieDispatch = ({url, title, id, ...props}) => {


    return (
        <div className={cl.ContainerConstruction}>

            <NavLink to={`video/${id}`}>
                <img src={url}/>
            </NavLink>

            <p>Title:{title}</p>
            <p>Description:{id}</p>           
            <p>Likes:{id}</p>

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

