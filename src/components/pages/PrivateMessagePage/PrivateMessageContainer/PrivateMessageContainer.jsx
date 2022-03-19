import React, { useEffect, useState } from 'react'
import cl from './PrivateMessageContainer.module.css'



function PrivateMessageContainer({user, text, avatar, ...props}) {



    return (
        <div className={cl.Container}>

            <div className={cl.userInfo}>
                <img src={avatar}/>
            </div>

            <div className={cl.textInfo}>
                <div>
                    User: {user}
                </div>
                <div>
                    Text: {text}
                </div>
                <div style={{fontWeight:'bold'}}>
                    Новых: 2 сообщния
                </div>
            </div>


        </div>
    )
}


export default PrivateMessageContainer