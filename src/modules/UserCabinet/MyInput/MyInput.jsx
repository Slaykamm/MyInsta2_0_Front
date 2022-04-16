import React from 'react';
import cl from './MyInput.module.css'

function MyInput({input, meta, validationmessage, ...props}) {
    const hasError = meta.touched && meta.error && true
   // console.log('neta', meta.error)
   // console.log('hasErrror', meta.valid)

 

 


    return (
        <div className={cl.OuterInput + " " +( hasError ? cl.aerror : cl.acorrect) }>
            <input 
                className={cl.Input} 
                {...props}
                {...input}  
            />
            <span className={cl.MyError}>
                {validationmessage}
                </span>        
        </div>

    );
}; 

export default MyInput
