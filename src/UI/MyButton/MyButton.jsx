import React from 'react'
import cl from './MyButton.module.css'
import Button from 'react-bootstrap/Button'

function _MyButton({children, ...props}) {
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

const MyButton = React.memo(_MyButton)
export default MyButton
