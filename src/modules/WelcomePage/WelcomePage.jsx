import React, { useEffect } from 'react';
import Footer from '../../components/pages/footer/Footer';
import Header from '../../components/pages/header/Header';
import cl from './WelcomePage.module.css'
import LoginForm from '../LoginForm/LoginForm';
import { reduxForm } from 'redux-form';
import { connect } from  'react-redux';
import { setUnverifyedUser, setVerifyedUser, setThunkResteredUsersData } from '../../redux/ActionCreators';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { get, omit } from 'lodash'
import { clearAllCookie, getAllCookie, getCookies, setCookies, clearOneCookie, cookieTransormToBoolean } from '../../services/cookieWorksService';
import { userCheckProcessingService } from '../../services/loginUserService';
import { getRegisteredUsersAPI } from '../../API/getRegisteredUsersAPI';
import { getUserDictAPI } from '../../API/getUserDictAPI';
import { getUserTokenAPI } from '../../API/getUserToken';
 


const WelcomePage = (props) => {
    const [isError, setIsError] = useState(false)
    const navigateMain = useNavigate()

    localStorage.setItem('SLNUserName', '');
    localStorage.setItem('SLNToken', '')

//TODO перевести на async await и не заниматься херней

//получаем словари
    useEffect(()=>
    {
        props.getUsersDict()
    },[])

    //работа с формой
    const LoginReduxForm = reduxForm({
        form: 'login'
    }) (LoginForm)

    
// в этом блоке мы во первых инфу из формы логин - запрашиваем токен на бек. Второе кладем имя юзера пока в стейт. 
// если вдруг будет ошибка то просто хрен всем. 
    const onSubmit = (formData) => {
        props.getUserToken(formData)
        props.setUnveryfyedUserStatus( omit(formData, 'password'))
    }

// короче тут получили ответ по токену и проверяем. тут именно логинизация. если код 200 то пишем в локал сторадж логин и пароль. и потом переходим на след страницу
    useEffect(()=>{
        if (get(props.userToken, [0, 'status']) == 200){
            localStorage.setItem('SLNUserName', props.isActualUser.username);
            localStorage.setItem('SLNToken', "Token " + get(props.userToken, [0, 'data', 'key']))
            navigateMain("/main")
        }
        if (get(props.userToken, [0, 'status']) == 400){
            setIsError(true)
            


        }
    },[props.userToken])



// Это просто костыль.
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
                    onSubmit={onSubmit} 
                    isError={isError}
                />
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
        usersDict: state.usersDict,
        userToken: state.UserToken

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
        },
        getUserToken: (userData) => {
            dispatch(getUserTokenAPI(userData))
        }
    })

    //mapDispatchToProps
    
    
    )(WelcomePage);