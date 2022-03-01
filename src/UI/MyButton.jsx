import React from 'react'
import cl from './MyButton.module.css'

function MyButton({children, ...props}) {
    return (
        <button
            className={cl.MyButton}
            {...props}
        >
            {children}
        </button>

        
    )
}

export default MyButton
