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

    useEffect(()=>{
      setUserInfo(props.usersDict[1])
    },[props.usersDict])

    console.log('useInfo2', props.usersDict)
    const test = filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')})
    console.log('Dict result', get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'avatar']))

    
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
                Страница Вашего Профиля
              </li>
              <li>
                Ваши Видео
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