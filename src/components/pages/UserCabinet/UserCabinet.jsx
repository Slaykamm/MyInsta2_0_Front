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


function UserCabinet(props) {


 
const [searchQuery, setSearchQuery] = useState('')


useEffect(()=>{
    props.getUsersDict()
  },[])




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
                                    <input/>
                        </div>

                        <div className={cl.UserInfoViewBtn}>
                            <button>Изменить</button>
                        </div>
                        <div className={cl.UserInfoViewBeforeConfirm}>
                            <span >OK</span>
                        </div>

                        <div className={cl.UserInfoViewLabel}>
                            <span>Ваш емаил </span>
                        </div>
                        <div className={cl.UserInfoViewInput}>
                                    <input/>
                        </div>

                        <div className={cl.UserInfoViewBtn}>
                                    <button>Изменить</button>
                        </div>
 
                        <div className={cl.UserInfoViewBeforeConfirm}>
                            <span>OK</span>
                        </div>

                        <div className={cl.UserInfoViewLabel}>
                            <span>Ваш пароль </span>
                        </div>

                        <div className={cl.UserInfoViewInput}>
                                    <input/>
                        </div>

                        <div className={cl.UserInfoViewBtn}>
                                    <button>Изменить</button>
                        </div>

                        <div className={cl.UserInfoViewConfirm}>
                            <span>OK</span>
                        </div>
                    </div>


                </div>

                <div className={cl.UserInfoViewImage}>
                        <img src={get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'avatar'])}/>
                        
                        <button>Изменить</button>
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