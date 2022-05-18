import React from 'react'
//import cl from '../UserCabinet.module.css'
import cl from './LKPassword.module.css'
import { Field } from 'redux-form'
import MyButton from '../../../UI/MyButton/MyButton'
import MyInputOld from '../MyInputOld/MyInputOld'
import MyInputNewPassword from '../MyInputNewPassword/MyInputNewPassword'
import { passwordSymbolsValidate, requiredField } from '../../WelcomePage/LoginForm/Validators/validatorsLogin'
import MyInput from '../MyInput/MyInput'


function LKPassword({oldPassword, confirmPasswordChanged, ...props}) {

    function changePasswordHandle(event) {
        setPassword(event)
}

    function handlePasswordChange(event){
    }


    return (
        <>
            
            <form 
                className={cl.UserInfoView} 
                onSubmit={props.handleSubmit}
            >  

                <div className={cl.UserInfoViewLabel}>
                    <span>Для изменения сначала введите старый пароль </span>
                </div>

                <div className={cl.UserInfoViewInput}>



                <Field
                        name={'lkeOldPassword'}
                        type='text'
                        placeholder='введите старый пароль'
                        component={MyInput}
                        validationmessage='должен содержать спец. симв, цифры и буквы'
                        disabled={oldPassword}
                        validate={[requiredField, passwordSymbolsValidate]}

                    />

                <Field
                    name={'lkeNewpassword'}
                    type='text'
                    placeholder='введите новый пароль'
                    component={MyInput}
                    validationmessage='должен содержать спец. симв, цифры и буквы'
                    validate={[requiredField, passwordSymbolsValidate]}
                    //disabled={!oldPassword}
                />
  
                </div>

                <div className={cl.UserInfoViewBtn}>
                    <MyButton>Изменить</MyButton>
                </div>

                <div className={cl.UserInfoViewConfirm}>
                {confirmPasswordChanged 
                    ? <span >OK</span>
                    : <span></span>
                    }
                </div>
            </form>
        </>
        
    )
}

export default LKPassword
