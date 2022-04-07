import React from 'react'
import { useState, useEffect } from 'react'
import { reduxForm } from 'redux-form';
import { get, filter, pick } from 'lodash'
import { connect } from 'react-redux'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { putToBaseAPI } from '../../../API/putToBaseAPI'
import { postToBaseMediaAPI } from '../../../API/postToBaseMediaAPI';
import { createNewUserAPI } from '../../../API/createNewUserAPI';
import { getPutToBaseResult, getPostToBaseMediaResult, getCreateEmptyUserResult} from '../../../redux/Selectors/baseSelectors'

import Header from '../header/Header'
import RegistrationForm from './RegistrationForm/RegistrationForm';
import NameForm from '../../../UI/LoadFIlesForm/NameForm';

import cl from './RegistrationPage.module.css'


function RegistrationPage(props) {
    const [userForEdit, setUserForEdit] = useState({})
    const [editUser, setEditUser] = useState({})
    const [aaa, setAaa] = useState()

    // Логика - создаем пустого юзера . 
    //     POST http://127.0.0.1:8000/auth/registration/ HTTP/1.1
    //     Content-Type: application/json
    

    // в эту созданную заявку начинаем дополнять

    function createUsers() {
        props.createUser()
        console.log('Далее сделать из юзера автора')    

    }

    useEffect(()=>{
        setUserForEdit(props.createEmpyUserResult)
        props.getUsersDict()
    },[props.createEmpyUserResult])
    
    console.log('yes', userForEdit)

    function submitRegistrationData(formData){
        console.log("registration Data", formData)
    }

    const RegForm = reduxForm({
        form: 'RegistrationForm'
    }) (RegistrationForm)


    function renderer(e){
        e.preventDefault;
        setAaa(Date.now())
    }




    // обработка загрузки аватарки
    function handleAvatarSubmit(e) {
        e.preventDefault();
        if (userForEdit.id){
            let files = e.target.files
            var formData = new FormData;
            formData.append('imagefile', files[0]);
            const url = `http://127.0.0.1:8000/api/author/${userForEdit.id}/`
            props.postToBaseMedia(formData, url)
            }
        }


    useEffect(()=> {
        if (props.postToBaseMediaResult.status === 200){
            props.getUsersDict()
            //window.location.reload();
            
        }
    }, [props.postToBaseMediaResult])


// TODO разобраться с валидациями. я вижу на каждое поле делать свой валидатор. и возможно свой инпут. но тут надо подумать.
    return (
        <>
            <Header/>
                <div className={cl.BaseLayer}>

                <button
                    onClick={createUsers}
                >Create</button>

                <button
                    onClick={renderer}
                >Render</button>

                    <div className={cl.InnerContainer}>
                        <div>
                            <h3>Приветстуем Вас на форме регистрации</h3>
                            <h5>для внесения Ваших данных введите знание и нажмите ок.</h5>

                            <RegForm
                                onSubmit={submitRegistrationData}
                            />
                        </div>


                <div className={cl.UserInfoViewImage}>
                    {console.log('FROM MODULE', editUser)}
                    {get(filter(props.usersDict, {'userID': userForEdit.id}),['0', 'avatar'])
                        ? <span><img src={get(filter(props.usersDict, {'userID': userForEdit.id}),['0', 'avatar'])} alt='avatar'/></span>
                        : <span><img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='avatar'/></span>
                    }

                    <div className={cl.AvatarButton}>
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

export default connect(
    //mapStateToProps
    state => ({
        usersDict: state.usersDict,
        putToBaseResult: getPutToBaseResult(state),
        postToBaseMediaResult: getPostToBaseMediaResult(state),
        createEmpyUserResult: getCreateEmptyUserResult(state)
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
        createUser: () => {
            dispatch(createNewUserAPI())
        }, 
        
    })
)(RegistrationPage);


