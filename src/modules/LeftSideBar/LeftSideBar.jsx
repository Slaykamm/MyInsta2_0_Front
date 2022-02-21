import React from 'react';
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserDictAPI } from '../../API/getUserDictAPI'
import { setLeftSideBarHideAction } from '../../redux/ActionCreators';
import Offcanvas from 'react-bootstrap/Offcanvas'
import cl from './LeftSideBar.module.css'


const LeftSideBar = (props) => {

  const [userInfo, setUserInfo] = useState()


    function handleClose () {
        props.setLeftPanelRedux(false);
    }

    
    useEffect(()=>{
      props.getUsersDict()
    },[])

    useEffect(()=>{
      setUserInfo(props.usersDict[1])
    },[props.usersDict])

    if (userInfo){
      console.log('dict', userInfo)

    }



  
  return (
    <>

      {userInfo
      ? 
        <Offcanvas show={props.sideBarShow} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Личный кабинет</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className={cl.userInfo}>
            <li >
                <img src={userInfo.avatar}/>

              </li>
              <li>
                <p>{userInfo.name}</p>
              </li>
              <li>
                Ваш профиль
              </li>
              <li>
                Ваши Видео
              </li>
              <li>
                Ваши сообщения
              </li>
              <li>
                Выйти
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>    
      : <p>Ожидаем данные с сервера</p>
    
    
      }


    </>
  );
}
  
  export default connect(
    //mapStateToProps
    state => ({
        sideBarShow: state.sideBarShow,
        usersDict: state.usersDict
    }),

    //mapDispatchToProps
    dispatch => ({
        setLeftPanelRedux: (value) =>{
            dispatch(setLeftSideBarHideAction(value))
        },
        getUsersDict: () => {
          dispatch(getUserDictAPI())
        }
    })
)(LeftSideBar);