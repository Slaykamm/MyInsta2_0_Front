import React from 'react'
import { Field } from 'redux-form'
import cl from '../UserCabinet.module.css'
import MyButton from '../../../UI/MyButton'
import MyInput from '../MyInput/MyInput'


function LKLogin({userLogin, ...props}) {

    

    return (
            <form  
                className={cl.UserInfoView} 
                onSubmit={props.handleSubmit}
                >  

                <div className={cl.UserInfoViewLabel}>
                    <span>Ваш Логин: <span style={{fontWeight:'bold'}}>{userLogin}</span></span>
                </div>
                <div className={cl.UserInfoViewInput}>
                    <Field
                            name={'lklogin'}
                            type='text'
                            placeholder='Введите новый логин'
                            component={MyInput}
                            validationmessage='Введенная строка не соотвествует эталонной'

                    />
                </div>
                <div className={cl.UserInfoViewBtn}>
                    <MyButton>Изменить</MyButton>
                </div>
                <div className={cl.UserInfoViewBeforeConfirm}>
                    <span >OK</span>
                </div>                       
            </form> 
    )
}

export default LKLogin






