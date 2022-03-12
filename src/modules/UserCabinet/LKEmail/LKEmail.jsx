import React from 'react'
import { Field } from 'redux-form'
import cl from '../UserCabinet.module.css'

import MyButton from '../../../UI/MyButton/MyButton'
import MyInput from '../MyInput/MyInput'

function LKEmail({value, userEmail, ...props}) {
    function changeEmailHandle(event) {
        setUserEmail(event)
    }

    

    
    return (
        <>
            <form 
                className={cl.UserInfoView} 
                onSubmit={props.handleSubmit}
            >  

            <div className={cl.UserInfoViewLabel}>
                <span>Ваш емаил: <span style={{fontWeight:'bold'}}>{userEmail}</span></span>
            </div>


                <div className={cl.UserInfoViewInput}>
                    <Field
                        name={'lkemail'}
                        type='email'
                        placeholder='введите новый емаил'
                        component={MyInput}
                        validationmessage='Введенная строка не емаил'

                    />
                </div>

                <div className={cl.UserInfoViewBtn}>
                    <MyButton>Изменить</MyButton>
                </div>

                <div className={cl.UserInfoViewBeforeConfirm}>
                    <span>OK</span>
                </div>   
            </form> 
    
        </>
    )
}

export default LKEmail


