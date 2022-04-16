import React from 'react'
import cl from './MyRedButton.module.css'
import Button from 'react-bootstrap/Button'

function MyRedButton({children, ...props}) {
    return (
        <button
            className={cl.MyButton}
            {...props}
        >
            {children}
        </button>

        // <Button 
        //     variant="secondary" 
        //     size="sm" 
        //     active {...props}
        // >
        //     {children}
        // </Button>
        
    )
}

export default MyRedButton
