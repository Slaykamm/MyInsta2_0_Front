import React from 'react';
import cl from './MyInputOld.module.css'

function MyInputOld({input, meta, ...props}) {
    const hasError = meta.touched && true
    //meta.error
    const test = meta.initial


    return (
        <div className={cl.OuterInput + " " +(hasError ? cl.error : cl.correct) }>
            <input 
                className={cl.Input} 
                {...props}
                {...input}  
            />
            <span className={cl.MyError}></span>        
        </div>

    );
}; 

export default MyInputOld
