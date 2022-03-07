import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import { get, filter } from 'lodash'
import { getUserDictAPI } from '../../API/getUserDictAPI'
import { filterQuery } from '../../services/filterQuery'
import Header from '../../components/pages/header/Header'
import Menu from '../Menu/Menu'
import MyButton from '../../UI/MyButton'
import LKLogin from './LKLogin/LKLogin';
import LKEmail from './LKEmail/LKEmail';
import LKPassword from './LKPassword/LKPassword';
import cl from './UserCabinet.module.css'

function UserCabinet(props) {

//TODO валидацию на инпуты.
 
const [searchQuery, setSearchQuery] = useState('')
const [userLogin, setUserLogin] = useState('bb')
const [userEmail, setUserEmail] = useState('aa')
const [userPassword, setPassword] = useState('')
const [oldPassword, setOldPassword] = useState(false)



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


function onSubmitLogin(formData) {
    console.log("Submit Login", formData)
}

function onSubmitEmail(formData) {
    console.log("Submit Email", formData)
}


function onSubmitPassword(formData) {
    console.log("Submit Password1", formData.lkeOldPassword)
    //TODO в этом месте происходит запрос пароля на сервер. И оттуда приходит тру или фолс и мые его тут присваиваем
    if (formData.lkeOldPassword == '444'){
        setOldPassword(true)
    }
    else{
        setOldPassword(false)
    }
    
}




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
                    <h5>для изменения Ваших данных введите новое знание и нажмите ок.</h5>

                    <LKLoginForm 
                        onSubmit={onSubmitLogin} 
                        userLogin={userLogin}
                        initialValues={{username: 'test'}}
                        
                        

                        
                        //isError={isError}
                    />

                    <LKEmailForm 
                        onSubmit={onSubmitEmail} 
                        userEmail={userEmail}
                        
                        // isError={isError}
                    />

                    <LKPasswordForm 
                        onSubmit={onSubmitPassword} 
                        oldPassword={oldPassword}
                      //  isError={isError}
                    />



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

//
// const mapStateToProps = (state, props) => ({
//     initialValues: state.initialName, // retrieve name from redux store 
//   })
  


export default connect(
    //mapStateToProps
    state => ({
        usersDict: state.usersDict,


    }),

    //mapDispatchToProps
    dispatch => ({
        getUsersDict: () => {
          dispatch(getUserDictAPI())
        }
    })
)(UserCabinet);