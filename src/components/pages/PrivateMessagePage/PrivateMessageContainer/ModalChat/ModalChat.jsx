import React from 'react'
import cl from './ModalChat.module.css'

function ModalChat({children, visible, setVisible, ...props}) {

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

export default ModalChat
