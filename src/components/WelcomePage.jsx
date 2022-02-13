import React, { useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
import cl from '../components/CSS/WelcomePage.module.css'
import LoginForm from '../modules/LoginForm/LoginForm';
import { reduxForm } from 'redux-form';
import { connect } from  'react-redux';
import { setUnverifyedUser, setVerifyedUser } from '../redux/ActionCreators';
import { useState } from 'react';
import { fetchResult } from './services/fetchingUser';
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import { includes } from 'lodash';
import { find } from 'lodash';
import _ from 'lodash'
import { clearAllCookie, getAllCookie, getCookies, setCookies, clearOneCookie, cookieTransormToBoolean } from './services/cookieWorksService';
import { userCheckProcessingService } from './services/loginUserService';
 


const WelcomePage = (props) => {
    const [userInfo, setUserInfo] = useState()


//получаем массив юзеров для проверки

if (!userInfo){

    const usersList = axios.get('https://jsonplaceholder.typicode.com/users');
    usersList.then(responce => 
            {
                setUserInfo(responce.data)
                console.log(responce.data)
            })
}

    //работа с формой
    const LoginReduxForm = reduxForm({
        form: 'login'
    }) (LoginForm)

    

    const onSubmit = (formData) => {
        if (!props.isActualUser.isVerifyed){  
            props.setUnveryfyedUserStatus(formData)
        }
 
        if (userInfo) {
            const userCheck = userCheckProcessingService(userInfo, formData)
            if (userCheck){
                props.setVeryfyedUserStatus(formData) 
                setCookies('isVerificated', true)
                setCookies("userName", formData.UserLogin)
                setCookies("isVerificated", true)
                console.log(' COOKIE',(getAllCookie()))
                console.log(' USER', props.isActualUser)
                return <Navigate to="/main" />
            }
            else {
                setCookies('isVerificated', false)
                console.log(' COOKIE',(getAllCookie()))
            }
        }
    }

/////////////////////////////////////

/////////////РАБОТА С КУКАМИ//////////////////////////

    useEffect(()=>{
        clearAllCookie(),
        props.setUnveryfyedUserStatus()
    }, [])


//TODO убрать этот костыль в Thunk когда будет бек
    function fetchUser () {
        props.setVeryfyedUserStatus(props.isActualUser)
        return <Navigate to="/main" />
    }



    return (
        <div>
            <Header/>
            <div className={cl.BaseLayer}>
                <button onClick={fetchUser}>CONFIRM USER</button>
                <LoginReduxForm 
                    onSubmit={onSubmit}/>
                <Footer/>
                {props.isActualUser.isVerifyed ? <Navigate to="/main" /> : <p></p>}
            </div>

        </div>
    );
};

export default connect(
    //mapStateToProps
    state => ({
        isActualUser: state.isActualUser

        }),

    dispatch => ({
        setUnveryfyedUserStatus: (value) =>{
            dispatch(setUnverifyedUser(value))
        },
        setVeryfyedUserStatus: (value) =>{
            dispatch(setVerifyedUser(value))
        }
    })

    //mapDispatchToProps
    
    
    )(WelcomePage);