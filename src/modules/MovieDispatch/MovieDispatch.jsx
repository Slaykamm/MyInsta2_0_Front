import React from 'react';
import cl from './MovieDispatch.module.css'


const movieDispatch = ({url, title, id, ...props}) => {

    return (
        <div className={cl.ContainerConstruction}>
            <img src={url}/>
            <p>{title}</p>
            <p>{id}</p>           
            <p>{id}</p>
 
        </div>
    );
};

export default movieDispatch;