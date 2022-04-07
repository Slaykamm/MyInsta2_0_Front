import React from 'react'
import cl from './MyButton.module.css'
import Button from 'react-bootstrap/Button'

function MyButton({children, ...props}) {
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

export default MyButton
