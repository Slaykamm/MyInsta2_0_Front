import React, { useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
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
import { clearAllCookie, getAllCookie, getCookies, setCookies, clearOneCookie } from './services/cookieWorks';

 


const WelcomePage = (props) => {

    const [verified, setVerfied] = useState(false)
    const [formData2, setFormData2] = useState()
    const [userInfo, setUserInfo] = useState()

    const LoginReduxForm = reduxForm({
        form: 'login'
    }) (LoginForm)


    useEffect(()=>{
        clearAllCookie()
    }, [])

    //выводим данные формы


    const onSubmit = (formData) => {
        if (!props.isActualUser.isVerifyed){       
        props.setUnveryfyedUserStatus(formData)
        }

        setFormData2(formData)

    }



    if (!userInfo){

        const usersList = axios.get('https://jsonplaceholder.typicode.com/users');
        usersList.then(responce => 
                {
                    setUserInfo(responce.data)
                })

    }

    // проверка логин пароль

        if (userInfo) {
            const checkUserLogin = userInfo.filter(userName=>(userName.username == (props.isActualUser['UserLogin'])))
            if (checkUserLogin.length){
                console.log('логин есть!', checkUserLogin)
                const checkUserPassword = _.get(checkUserLogin,[0, 'id']) == props.isActualUser['UserPassword']
                if (checkUserPassword) {
                    console.log("И пароль есть!")
                    props.setVeryfyedUserStatus(props.isActualUser)
                }
                else {
                    console.log("Пароль не верный!")
                }



            }
            else{
                console.log("Данный пользователь отстутствует")
            }
        }



    function fetchUser () {
        props.setVeryfyedUserStatus(props.isActualUser)
        return <Navigate to="/main" />
    }


    if (props.isActualUser.isVerifyed){

// COOOOOOKIE WORKS!!!!!!!!!!!!!!!!!/////////////////////

    // clearAllCookie();  // ВСЕ ОЧИСТИТЬ
    // console.log("Test1", getAllCookie())  //ПОЛУЧИТЬ ВСЕ КУКИ

    // setCookies("login", "BoBcAt"+props.isActualUser.UserLogin+"Lobser")   //ПОСТАВИТЬ КУКУ КЛЮЧ+ЗНАЧЕНИЕ
    // console.log("Test2", getAllCookie())

    //setCookies("login2", "ELEPHANT")

    //сделать куку где будет имя юзера 
    setCookies("userName", props.isActualUser.UserLogin)
    setCookies("isVerificated", true)


    // const test3 = getCookies('login') // ПОЛУЧИТЬ КУКУ ПО ЗНАЧЕНИЕЮ

    // console.log("Test3", test3)


    // clearOneCookie("login")  //del one cookie
    
    
    // console.log("Test4", getAllCookie())

    // clearOneCookie("login2")  //del one cookie

    // console.log("Test5", getAllCookie())


    return <Navigate to="/main" />
    }


    


//вот тут подумать. как залогиненного юзера выслать. вообще по идее надо эту хню выкидывать отсюда в экшн.

    return (
        <div>
            <Header/>
            <p></p>
            <button onClick={fetchUser}>CONFIRM USER</button>
            <LoginReduxForm 
                onSubmit={onSubmit}/>
            <Footer/>



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