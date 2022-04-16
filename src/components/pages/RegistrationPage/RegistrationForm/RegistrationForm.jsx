import React from 'react'
import { useState } from 'react'
import cl from './RegistrationForm.module.css'
import { Field } from 'redux-form'
import MyInput from '../../../../modules/UserCabinet/MyInput/MyInput'
//import MyInput from './MyInput/MyInput'
import MyButton from '../../../../UI/MyButton/MyButton'
import { emailSybmolsValidate, loginSybmolsValidate, passwordSymbolsValidate, phoneSybmolsValidate, requiredField } from '../../../../modules/WelcomePage/LoginForm/Validators/validatorsLogin'


function RegistrationForm(props) {

    const [isFormCorrectAndConfirmed, setIsFormCorrectAndConfirmed] = useState(false)

    function regEmailButtonHandle(event) {
        event.preventDefault()
        console.log('works3')
    }


    function regPhoneButtonHandle(event) {
        event.preventDefault()
        console.log('works4')
    }

    const isPhoneConfirmed = false
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
                    placeholder='Введите новый логин'
                    component={MyInput}
                    validationmessage='Только цифры или латиница'
                    validate={[requiredField, loginSybmolsValidate]}
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
                    placeholder='введите новый пароль'
                    component={MyInput}
                    validationmessage='должен содержать спец. симв, цифры и буквы'
                    validate={[requiredField, passwordSymbolsValidate]}
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
                    type='email'
                    placeholder='введите новый емаил'
                    component={MyInput}
                    validationmessage='Введенная строка не емаил'
                    validate={[requiredField, emailSybmolsValidate]}
                />
            </div>

            <div className={cl.UserInfoViewBtn}>
            <MyButton
                onClick={regEmailButtonHandle}
                >
                    Подтвердить</MyButton>

                {/* TODO после сохранить тут высылаем емаил на кофирм. */}
            </div>

            <div className={cl.confirmMessage}>
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
                    validationmessage='Допускаются только цифры'
                    validate={[requiredField, phoneSybmolsValidate]}
                />

            </div>

            <div className={cl.UserInfoViewBtn}>
            <MyButton
                onClick={regPhoneButtonHandle}
                >
                    Подтвердить</MyButton>
            </div>
                {/* TODO после сохранить тут высылаем смс на кофирм. */}
            <div className={cl.confirmMessage}>
                <span >SMS выслано</span>
            </div> 

            <MyButton
            //disabled={isPhoneConfirmed && isEmailConfirmed}
            
            >
                Регистрация
            </MyButton>

        </form> 

    )
}

export default RegistrationForm
