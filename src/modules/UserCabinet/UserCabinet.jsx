import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import { get, filter } from 'lodash'
import { getUserDictAPI } from '../../API/getUserDictAPI'
import { filterQuery } from '../../services/filterQuery'
import { putToBaseAPI } from '../../API/putToBaseAPI'
import { postToBaseMediaAction } from '../../redux/actions/postToBaseMediaAction';
import { postToBaseMediaAPI } from '../../API/postToBaseMediaAPI';
import { changeUserPasswordAPI } from '../../API/changeUserPasswordAPI';
import { getPutToBaseResult, getPostToBaseMediaResult, getChangePasswordResult } from  '../../redux/Selectors/baseSelectors'
import Header from '../../components/pages/header/Header'
import Menu from '../Menu/Menu'
import MyButton from '../../UI/MyButton/MyButton'
import LKLogin from './LKLogin/LKLogin';
import LKEmail from './LKEmail/LKEmail';
import LKPassword from './LKPassword/LKPassword';
import cl from './UserCabinet.module.css'
import NameForm from '../../UI/LoadFIlesForm/NameForm';

import { getUserTokenAPI } from '../../API/getUserToken';





function UserCabinet(props) {

//TODO валидацию на инпуты.
 
const [searchQuery, setSearchQuery] = useState('')
const [userLogin, setUserLogin] = useState('bb')
const [unconfirmedNewLogin, setUnconfirmedNewLogin] = useState('')
const [confirmLoginChanged, serConfirmLoginChanged] = useState(false)
const [confirmEmailChanged, serConfirmEmailChanged] = useState(false)
const [confirmPasswordChanged, serConfirmPasswordChanged] = useState(false)

const [userEmail, setUserEmail] = useState('aa')
const [userPassword, setPassword] = useState('')
const [oldPassword, setOldPassword] = useState(false)

const [unconfirmedNewEmail, setUnconfirmedNewEmail] = useState('')



const [avaChanged, setAvaChanged] = useState('')

// ---------если у нас пользак не авторизован - кдиаем его на страницу логина. 
const navigate = useNavigate()

// if (!localStorage.getItem('SLNUserName')){
//     navigate("/login")
// }



useEffect(()=>{
    props.getUsersDict()
  },[])

useEffect(()=>{
    if (props.usersDict.length){
    setUserLogin(get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'username']))
    setUserEmail(get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'email']))
}
},[props.usersDict])


const LKLoginForm = reduxForm({
    form: 'LKLogin'
}) (LKLogin)

const LKEmailForm = reduxForm({
    form: 'LKEmail'
}) (LKEmail)


const LKPasswordForm = reduxForm({
    form: 'LKPassword'

}) (LKPassword)

//меняем логин. после изменения на беке перезаписываем 
function onSubmitLogin(formData) {

    const message = {
        "username": formData.lklogin 
    }
    const url = '/users'
    props.putToBase(
        message,
        url,
        get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'id'])
        )
        setUnconfirmedNewLogin(formData.lklogin)

}

useEffect(()=>{
    // TODO обрбаотать ошибку. при ошибке ставить false
    if (props.putToBaseResult === 200 && unconfirmedNewLogin) {
        serConfirmLoginChanged(true)
        localStorage.setItem('SLNUserName', unconfirmedNewLogin);
        setUnconfirmedNewLogin('')
        window.location.reload();
    }
    else {
        serConfirmLoginChanged(false)
        setUnconfirmedNewLogin('')

    }
},[props.putToBaseResult])


//==============================E M A I L   C H A N G E ===============
function onSubmitEmail(formData) {
    const message = {
        "email": formData.lkemail 
    }
    const url = '/users'
    console.log('1111', get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'id']) )
    props.putToBase(
        message,
        url,
        get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'id'])

        )
        setUnconfirmedNewEmail(formData.lkemail)
}

useEffect(()=>{
    if (props.putToBaseResult === 200 && unconfirmedNewEmail) {
        serConfirmEmailChanged(true)
        setUnconfirmedNewEmail('')
    }
    else {
        serConfirmEmailChanged(false)
        setUnconfirmedNewEmail('')
    }
},[props.putToBaseResult])
//=================================END==========


function onSubmitPassword(formData) {
    //TODO в этом месте происходит запрос пароля на сервер. И оттуда приходит тру или фолс и мые его тут присваиваем
    props.changePassword(localStorage.getItem('SLNToken'), formData)
}

useEffect(()=>{
    console.log('props.changePasswordResult', props.changePasswordResult)
    if (props.changePasswordResult.message === 'Password updated successfully')
        serConfirmPasswordChanged(true)
},[props.changePasswordResult])


function handleAvatarChange(event){
    console.log('отправляем на Юг аватарку')
    
}

// Блок фильтрации роликов//////////////////////////////////////////
function checkTheInput(event){
    setSearchQuery(event.target.value)

}
const listFiles=[]
const filteredVideo=filterQuery(listFiles, searchQuery)

// ВСЕ
//TODO убрать тут из меню в этой странице поиск.





// обработка загрузки аватарки
function handleAvatarSubmit(e) {
    e.preventDefault();
    let files = e.target.files
    console.log('files', files[0])

    var formData = new FormData;
    formData.append('imagefile', files[0]);

        const url = `http://127.0.0.1:8000/api/author/${get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'userID'])}/`

        props.postToBaseMedia(formData, url)
}

    useEffect(()=> {
        if (props.postToBaseMediaResult.status === 200){
            window.location.reload();
        }
    }, [props.postToBaseMediaResult])





    return (
        <>

        
        <Header/>
            <Menu 
                disable
                value={searchQuery}
                onChange={checkTheInput}
                placeholder='Поиск в названиях'
            />
        <div className={cl.BaseLayer}>
            <div className={cl.InnerContainer}>
                <div>
                    <h3>Приветстуем Вас {localStorage.getItem('SLNUserName')}</h3>
                    <h5>для изменения Ваших данных введите новое значение и нажмите изменить.</h5>

                    <LKLoginForm 
                        onSubmit={onSubmitLogin} 
                        userLogin={userLogin}
                        initialValues={{username: 'test'}}
                        confirmLoginChanged={confirmLoginChanged}
                        //isError={isError}
                        />

                    <LKEmailForm 
                        onSubmit={onSubmitEmail} 
                        userEmail={userEmail}
                        confirmEmailChanged={confirmEmailChanged}
                        
                        // isError={isError}
                    />

                    <LKPasswordForm 
                        onSubmit={onSubmitPassword} 
                        oldPassword={oldPassword}
                        confirmPasswordChanged={confirmPasswordChanged}
                        
                      //  isError={isError}
                    />



                </div>

                <div className={cl.UserInfoViewImage}>
                        {get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'avatar']) 
                            ? <span> <img src={get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'avatar'])}/></span>
                            : <span><img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='avatar'/></span>
                        }

                        <div className={cl.AvatarButton}>
                            Для смены аватара выберите другое изображение
                            <p></p>
                        <NameForm 
                            handleSubmit={handleAvatarSubmit}  
                            />                           
                        </div>


                </div>

            </div>                

        </div>


        
        </>
        
        
    )
}

//
// const mapStateToProps = (state, props) => ({
//     initialValues: state.initialName, // retrieve name from redux store 
//   })
  


export default connect(
    //mapStateToProps
    state => ({
        usersDict: state.usersDict,
        putToBaseResult: getPutToBaseResult(state),
        postToBaseMediaResult: getPostToBaseMediaResult(state),
        changePasswordResult: getChangePasswordResult(state),
    }),

    //mapDispatchToProps
    dispatch => ({
        getUsersDict: () => {
          dispatch(getUserDictAPI())
        },
        putToBase: (value, id, url) => {
            dispatch(putToBaseAPI(value, id, url))
        },  
        postToBaseMedia: (formData, url) => {
            dispatch(postToBaseMediaAPI(formData, url))
        }, 
        changePassword: (userToken, formData) => {
            dispatch(changeUserPasswordAPI(userToken, formData))
        },   
    })
)(UserCabinet);


