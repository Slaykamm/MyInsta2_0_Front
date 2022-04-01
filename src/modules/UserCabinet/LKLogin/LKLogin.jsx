import React from 'react'
import { Field } from 'redux-form'
import cl from '../UserCabinet.module.css'
import MyButton from '../../../UI/MyButton/MyButton'
import MyInput from '../MyInput/MyInput'


function LKLogin({userLogin, confirmLoginChanged, ...props}) {

    console.log('check', confirmLoginChanged)

    return (
            <form  
                className={cl.UserInfoView} 
                onSubmit={props.handleSubmit}
                >  

                <div className={cl.UserInfoViewLabel}>
                    <span>Ваш Логин: <p style={{fontWeight:'bold'}}>{userLogin}</p></span>
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
                <div className={cl.UserInfoViewConfirm}>
                    {confirmLoginChanged 
                    ? <span >OK</span>
                    : <span></span>
                    }
                </div>                       
            </form> 
    )
}

export default LKLogin






