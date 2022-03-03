import React from 'react';
import cl from './MyInput.module.css'

function MyInput({input, meta, validationMessage, ...props}) {
    const hasError = meta.touched && meta.error


    return (
        <div className={cl.OuterInput + " " +(hasError ? cl.error : "") }>
            <input 
                className={cl.Input} 
                {...props}
                {...input}  
            />
            <span className={cl.MyError}>{validationMessage}</span>        
        </div>

    );
};

export default MyInput
