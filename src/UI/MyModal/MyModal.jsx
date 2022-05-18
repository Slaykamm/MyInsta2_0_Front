import React from 'react'
import cl from './MyModal.module.css'

function _MyModal({children, visible, setVisible, ...props}) {

    //console.log('_MyModal rendered')
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

const MyModal = React.memo(_MyModal)

export default MyModal
