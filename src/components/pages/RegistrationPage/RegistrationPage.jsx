import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import cl from './RegistrationPage.module.css'
import { reduxForm } from 'redux-form';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import MyButton from '../../../UI/MyButton/MyButton';
import { get, filter } from 'lodash'

function RegistrationPage(props) {

    function handleAvatarChange(){
        console.log('AVA AVA')
    }

    function submitRegistrationData(formData){
        console.log("registration Data", formData)
    }

    const RegForm = reduxForm({
        form: 'RegistrationForm'
    }) (RegistrationForm)
    
// TODO разобраться с валидациями. я вижу на каждое поле делать свой валидатор. и возможно свой инпут. но тут надо подумать.
    return (
        <>
            <Header/>
                <div className={cl.BaseLayer}>

                    <div className={cl.InnerContainer}>
                        <div>
                            <h3>Приветстуем Вас на форме регистрации</h3>
                            <h5>для внесения Ваших данных введите знание и нажмите ок.</h5>

                            <RegForm
                            onSubmit={submitRegistrationData}
                            />
                        </div>

                <div className={cl.UserInfoViewImage}>
                    <img src={get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'avatar'])}/>
                    <MyButton onClick={handleAvatarChange}>Загрузить аватарку</MyButton> 
                </div>


                    </div>

                </div>
        
        </>
    )
}

export default RegistrationPage
