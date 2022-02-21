import React, { useEffect } from 'react';
import Footer from '../../components/pages/footer/Footer';
import Header from '../../components/pages/header/Header';
import cl from './WelcomePage.module.css'
import LoginForm from '../LoginForm/LoginForm';
import { reduxForm } from 'redux-form';
import { connect } from  'react-redux';
import { setUnverifyedUser, setVerifyedUser, setThunkResteredUsersData } from '../../redux/ActionCreators';
import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import _ from 'lodash'
import { clearAllCookie, getAllCookie, getCookies, setCookies, clearOneCookie, cookieTransormToBoolean } from '../../services/cookieWorksService';
import { userCheckProcessingService } from '../../services/loginUserService';
import { getRegisteredUsersAPI } from '../../API/getRegisteredUsersAPI';
import { getUserDictAPI } from '../../API/getUserDictAPI';
 


const WelcomePage = (props) => {
    const [userInfo, setUserInfo] = useState()


//TODO перевести на async await и не заниматься херней
    useEffect(()=>
    {
            // тут дергаем функию снизу из mapDispatchToProps
            //т.к. получили в пропсах результат дергания - кладем его в стейт
        props.getUsersThunk(),
        props.getUsersDict()
    },[])

    useEffect(()=>{
        setUserInfo(props.getUsers2) 

    },[props.getUsers2])
    

    console.log('USER_DICT', props.usersDict)


//получаем массив юзеров для проверки



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
        isActualUser: state.isActualUser,
        getUsers2: state.asyncUsersRequest,  //кладем в пропс из редюсера результат
        usersDict: state.usersDict

        }),

    dispatch => ({
        setUnveryfyedUserStatus: (value) =>{
            dispatch(setUnverifyedUser(value))
        },
        setVeryfyedUserStatus: (value) =>{
            dispatch(setVerifyedUser(value))
        },
        getUsersThunk: () => {    //это просто ф-ция которую для запроса будем дергать 
            dispatch(getRegisteredUsersAPI())   //а вот это функция которая у нас в THUNK достаем через диспатч
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        }
    })

    //mapDispatchToProps
    
    
    )(WelcomePage);