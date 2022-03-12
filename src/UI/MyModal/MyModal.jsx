import React from 'react'
import cl from './MyModal.module.css'

function MyModal({children, visible, setVisible, ...props}) {

    const rootClasses = [cl.MyModal]

    if (visible) {
        rootClasses.push(cl.active)
    }


    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.MyModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
            
        
        </div>
    )
}

export default MyModal
