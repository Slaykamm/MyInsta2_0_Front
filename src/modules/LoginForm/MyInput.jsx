import React from 'react';
import cl from '../LoginForm/MyInput.module.css'

function MyInput({input, meta, validationMessage, ...props}) {
    return (
        <div className={cl.OuterInput}>
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
