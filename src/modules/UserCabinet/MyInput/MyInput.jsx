import React from 'react';
import cl from './MyInput.module.css'

function MyInput({input, meta, ...props}) {
    const hasError = meta.touched && true
    //meta.error
    const test = meta.initial


    return (
        <div className={cl.OuterInput + " " +(hasError ? cl.aerror : cl.acorrect) }>
            <input 
                className={cl.Input} 
                {...props}
                {...input}  
            />
            <span className={cl.MyError}></span>        
        </div>

    );
}; 

export default MyInput
