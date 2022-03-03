import React from 'react';
import cl from './MyInputNewPassword.module.css'

function MyInputNewPassword({input, meta, ...props}) {
    const hasError = meta.touched && false
    //meta.error
    const test = meta.initial


    return (
        <div className={cl.OuterInput + " " +(hasError ? cl.errorNew : "") }>
            <input 
                className={cl.Input} 
                {...props}
                {...input}  
            />
            <span className={cl.MyError}></span>        
        </div>

    );
}; 

export default MyInputNewPassword
