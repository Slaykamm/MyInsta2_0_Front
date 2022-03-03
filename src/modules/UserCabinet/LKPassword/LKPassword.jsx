import React from 'react'
//import cl from '../UserCabinet.module.css'
import cl from './LKPassword.module.css'
import { Field } from 'redux-form'
import MyButton from '../../../UI/MyButton'
import MyInputOld from '../MyInputOld/MyInputOld'
import MyInputNewPassword from '../MyInputNewPassword/MyInputNewPassword'


function LKPassword({oldPassword, ...props}) {



    function changePasswordHandle(event) {
        setPassword(event)
}

    function handlePasswordChange(event){
        console.log('отправляем на Юг', userPassword)
    }


    return (
        <>
            
            <form 
                className={cl.UserInfoView} 
                onSubmit={props.handleSubmit}
            >  

                <div className={cl.UserInfoViewLabel}>
                    <span>Ваш пароль </span>
                </div>

                <div className={cl.UserInfoViewInput}>



                <Field
                        name={'lkeOldPassword'}
                        type='text'
                        placeholder='введите старый пароль'
                        component={MyInputOld}
                        validationmessage='Пароль не верный'
                        disabled={oldPassword}

                    />

                <Field
                    name={'lkeNewpassword'}
                    type='text'
                    placeholder='введите новый пароль'
                    component={MyInputNewPassword}
                    validationmessage='Введенный пароль не соотвествует эталлонному'
                    disabled={!oldPassword}
                />
  
                </div>

                <div className={cl.UserInfoViewBtn}>
                    <MyButton>Изменить</MyButton>
                </div>

                <div className={cl.UserInfoViewConfirm}>
                    <span>OK</span>
                </div>
            </form>
        </>
        
    )
}

export default LKPassword
