import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux'
import { setLeftSideBarShowAction, setLeftSideBarHideAction } from '../../redux/ActionCreators';

import Offcanvas from 'react-bootstrap/Offcanvas'

const LeftSideBar = (props) => {



        function handleClose () {
            props.setLeftPanelRedux(false);
            console.log('from left', props.sideBarShow)

        }


        const handleShow = () => props.setLeftPanelRedux(true);
      
        return (
          <>
            {/* <Button variant="primary" onClick={handleShow}>
              Launch
            </Button> */}
      
            <Offcanvas show={props.sideBarShow} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
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