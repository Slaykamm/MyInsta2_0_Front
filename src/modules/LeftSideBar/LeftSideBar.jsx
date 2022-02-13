import React from 'react';

import { connect } from 'react-redux'
import { setLeftSideBarHideAction } from '../../redux/ActionCreators';

import Offcanvas from 'react-bootstrap/Offcanvas'

const LeftSideBar = (props) => {


        function handleClose () {
            props.setLeftPanelRedux(false);
        }
        
      
        return (
          <>
      
            <Offcanvas show={props.sideBarShow} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Личный кабинет</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul>
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
          </>
        );
      }
      
      export default connect(
        //mapStateToProps
        state => ({
            sideBarShow: state.sideBarShow
        }),
    
        //mapDispatchToProps
        dispatch => ({
            setLeftPanelRedux: (value) =>{
                dispatch(setLeftSideBarHideAction(value))
            }
        })
    )(LeftSideBar);