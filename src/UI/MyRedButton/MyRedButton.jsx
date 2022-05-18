import React from 'react'
import cl from './MyRedButton.module.css'
import Button from 'react-bootstrap/Button'

function _MyRedButton({children, ...props}) {
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

const MyRedButton = React.memo(_MyRedButton)
export default MyRedButton
