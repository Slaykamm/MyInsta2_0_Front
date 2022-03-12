import React from 'react'
import cl from './RegistrationForm.module.css'
import { Field } from 'redux-form'
import MyInput from '../../../../modules/UserCabinet/MyInput/MyInput'
//import MyInput from './MyInput/MyInput'
import MyButton from '../../../../UI/MyButton/MyButton'


function RegistrationForm(props) {

    function regEmailButtonHandle(event) {
        event.preventDefault()
        console.log('works3')
    }


    function regPhoneButtonHandle(event) {
        event.preventDefault()
        console.log('works4')
    }

    return (
        <form  
            className={cl.UserInfoView} 
            onSubmit={props.handleSubmit}
            >  

            <div className={cl.UserInfoViewLabel}>
                <span>Ваш Логин:</span>
            </div>

            <div className={cl.UserInfoViewInput}>
                <Field
                    name={'regLogin'}
                    type='text'
                    placeholder='Введите логин'
                    component={MyInput}
                    validationmessage='Введенная строка не соотвествует эталонной'
                />
            </div>

            <div className={cl.UserInfoViewBtn}>

            </div>

            <div className={cl.UserInfoViewBeforeConfirm}>
                <span >OK</span>
            </div> 


            <div className={cl.UserInfoViewLabel}>
                <span>Ваш пароль:</span>
            </div>

            <div className={cl.UserInfoViewInput}>
                <Field
                    name={'regPassword'}
                    type='text'
                    placeholder='Введите пароль'
                    component={MyInput}
                    validationmessage='Введенная строка не соотвествует эталонной'
                />

            </div>

            <div className={cl.UserInfoViewBtn}>

            </div>

            <div className={cl.UserInfoViewBeforeConfirm}>
                <span >OK</span>
            </div> 

            <div className={cl.UserInfoViewLabel}>
                <span>Ваш email:</span>
            </div>

            <div className={cl.UserInfoViewInput}>
                <Field
                    name={'regEmail'}
                    type='text'
                    placeholder='Введите email'
                    component={MyInput}
                    validationmessage='Введенная строка не соотвествует эталонной'
                />
            </div>

            <div className={cl.UserInfoViewBtn}>
            <MyButton
                onClick={regEmailButtonHandle}
                >
                    Подтвердить</MyButton>

                {/* TODO после сохранить тут высылаем емаил на кофирм. */}
            </div>

            <div >
                <span >Письмо выслано</span>
            </div> 

            <div className={cl.UserInfoViewLabel}>
                <span>Ваш телефон:</span>
            </div>

            <div className={cl.UserInfoViewInput}>
                <Field
                    name={'regPhone'}
                    type='text'
                    placeholder='Введите телефон'
                    component={MyInput}
                    validationmessage='Введенная строка не соотвествует эталонной'
                />

            </div>

            <div className={cl.UserInfoViewBtn}>
            <MyButton
                onClick={regPhoneButtonHandle}
                >
                    Подтвердить</MyButton>
            </div>
                {/* TODO после сохранить тут высылаем смс на кофирм. */}
            <div>
                <span >SMS выслано</span>
            </div> 
            

            <MyButton>Зарегистрироваться</MyButton>

        </form> 

    )
}

export default RegistrationForm
