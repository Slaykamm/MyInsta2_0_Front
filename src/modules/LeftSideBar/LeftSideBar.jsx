import React from 'react';
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserDictAPI } from '../../API/getUserDictAPI'
import { setLeftSideBarHideAction } from '../../redux/ActionCreators';
import Offcanvas from 'react-bootstrap/Offcanvas'
import cl from './LeftSideBar.module.css'
import { filter, get } from 'lodash'
import Nav from 'react-bootstrap/Nav'



const LeftSideBar = (props) => {

  const [userInfo, setUserInfo] = useState()


    function handleClose () {
        props.setLeftPanelRedux(false);
    }

    
    useEffect(()=>{
      props.getUsersDict()
    },[])

    //TODO исправить это. сделать чтобы то что ниже клало ай ди юзера
    useEffect(()=>{
      setUserInfo(props.usersDict[1])
    },[props.usersDict])

    const test = filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')})

    
// Дописать кабинеты  видео сообщений и профиля
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
                <img src={get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'avatar'])}/>

              </li>
              <li>
                <p>{get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'username'])}</p>
              </li>
              
              <li>
              

              <Nav.Item>
                  <Nav.Link href="/lk"><span style={{color:'black'}}>Страница Вашего Профиля</span></Nav.Link>
              </Nav.Item>
                
              </li>
              <li>
                  <Nav.Link href="/userVideoPage"><span style={{color:'black'}}>Ваши видео</span></Nav.Link>
              </li>
              <li>
                Ваши сообщения
              </li>
              <li>
              <Nav.Item>
                  <Nav.Link href="/login"><span style={{color:'black'}}>Выход</span></Nav.Link>
              </Nav.Item>
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