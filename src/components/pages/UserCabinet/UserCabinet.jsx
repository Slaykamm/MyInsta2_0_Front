import React from 'react'
import Header from '../header/Header'
import Menu from '../../../modules/Menu/Menu'
import Footer from '../footer/Footer'
import { useState, useEffect } from 'react'
import { filterQuery } from '../../../services/filterQuery'
import cl from './UserCabinet.module.css'
import { connect } from 'react-redux'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { get, filter } from 'lodash'
import MyButton from '../../../UI/MyButton'

function UserCabinet(props) {

//TODO валидацию на инпуты.
 
const [searchQuery, setSearchQuery] = useState('')
const [userLogin, setUserLogin] = useState('bb')
const [userEmail, setUserEmail] = useState('aa')
const [userPassword, setPassword] = useState('')


useEffect(()=>{
    props.getUsersDict()
  },[])

useEffect(()=>{
    if (props.usersDict.length){
    setUserLogin(get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'username']))
    setUserEmail(get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'email']))
}
},[props.usersDict])



function changeLoginHandle(event) {
    setUserLogin(event)
}

function changeEmailHandle(event) {
    setUserEmail(event)
}

function changePasswordHandle(event) {
    setPassword(event)
}





function handleLoginChange(event){
    console.log('отправляем на Юг', userLogin)
}

function handleEmailChange(event){
    console.log('отправляем на Юг', userEmail)
}

function handlePasswordChange(event){
    console.log('отправляем на Юг', userPassword)
}

function handleAvatarChange(event){
    console.log('отправляем на Юг аватарку' )
    
}

// Блок фильтрации роликов//////////////////////////////////////////
function checkTheInput(event){
    setSearchQuery(event.target.value)

}
const listFiles=[]
const filteredVideo=filterQuery(listFiles, searchQuery)
// ВСЕ
//TODO убрать тут из меню в этой странице поиск.
    return (
        <>

        
        <Header/>
            <Menu 
                value={searchQuery}
                onChange={checkTheInput}
                placeholder='Поиск в названиях'
            />
        <div className={cl.BaseLayer}>
            <div className={cl.InnerContainer}>
                <div>
                    <h3>Приветстуем Вас {localStorage.getItem('SLNUserName')}</h3>
                    <h5>для изменения Ваших данных введине новое знание и нажмите ок.</h5>

                    
                    <div className={cl.UserInfoView}>

                        <div className={cl.UserInfoViewLabel}>
                            <span>Ваш Логин </span>
                        </div>
                        <div className={cl.UserInfoViewInput}>
                                    <input
                                        value={userLogin}
                                        onChange={e => changeLoginHandle(e.target.value)}
                                    />
                        </div>
                        <div className={cl.UserInfoViewBtn}>
                            <MyButton  onClick={handleLoginChange}>Изменить</MyButton>
                        </div>
                        <div className={cl.UserInfoViewBeforeConfirm}>
                            <span >OK</span>
                        </div>

                        <div className={cl.UserInfoViewLabel}>
                            <span>Ваш емаил </span>
                        </div>
                        <div className={cl.UserInfoViewInput}>
                                    <input
                                        type='email'
                                        value={userEmail}
                                        onChange={e => changeEmailHandle(e.target.value)}
                                    />
                        </div>

                        <div className={cl.UserInfoViewBtn}>
                            <MyButton onClick={handleEmailChange}>Изменить</MyButton>
                        </div>
 
                        <div className={cl.UserInfoViewBeforeConfirm}>
                            <span>OK</span>
                        </div>

                        <div className={cl.UserInfoViewLabel}>
                            <span>Ваш пароль </span>
                        </div>

                        <div className={cl.UserInfoViewInput}>
                                    <input
                                    value={userPassword}
                                    onChange={e => changePasswordHandle(e.target.value)}
                                    />
                        </div>

                        <div className={cl.UserInfoViewBtn}>
                            <MyButton onClick={handlePasswordChange}>Изменить</MyButton>
                        </div>

                        <div className={cl.UserInfoViewConfirm}>
                            <span>OK</span>
                        </div>
                    </div>


                </div>

                <div className={cl.UserInfoViewImage}>
                        <img src={get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'avatar'])}/>
                        <MyButton onClick={handleAvatarChange}>Изменить</MyButton> 
                </div>

            </div>                

        </div>


        
        </>
        
        
    )
}

export default connect(
    //mapStateToProps
    state => ({

        usersDict: state.usersDict
    }),

    //mapDispatchToProps
    dispatch => ({
        getUsersDict: () => {
          dispatch(getUserDictAPI())
        }
    })
)(UserCabinet);