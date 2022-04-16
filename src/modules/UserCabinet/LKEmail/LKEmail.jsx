import React from 'react'
import { Field } from 'redux-form'
import cl from '../UserCabinet.module.css'

import MyButton from '../../../UI/MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import { emailSybmolsValidate, requiredField } from '../../WelcomePage/LoginForm/Validators/validatorsLogin'

function LKEmail({value, userEmail, confirmEmailChanged, ...props}) {
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
                <span>Ваш емаил: <p style={{fontWeight:'bold'}}>{userEmail}</p></span>
            </div>


                <div className={cl.UserInfoViewInput}>
                    <Field
                        name={'lkemail'}
                        type='email'
                        placeholder='введите новый емаил'
                        component={MyInput}
                        validationmessage='Введенная строка не емаил'
                        validate={[requiredField, emailSybmolsValidate]}

                    />
                </div>

                <div className={cl.UserInfoViewBtn}>
                    <MyButton>Изменить</MyButton>
                </div>

                <div className={cl.UserInfoViewConfirm}>
                {confirmEmailChanged 
                    ? <span >OK</span>
                    : <span></span>
                    }
                </div>   
            </form> 
    
        </>
    )
}

export default LKEmail


