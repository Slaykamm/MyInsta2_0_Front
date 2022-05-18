import React from 'react'
import cl from './ModalChat.module.css'

function _ModalChat({children, visible, setVisible, ...props}) {


    //console.log('ModalChat rendered2')

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

const ModalChat = React.memo(_ModalChat)
export default ModalChat
