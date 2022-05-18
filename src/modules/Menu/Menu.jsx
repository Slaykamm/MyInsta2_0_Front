import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { setLeftSideBarShowAction, setLeftSideBarHideAction} from '../../redux/ActionCreators'

import cl from './Menu.module.css'

import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import _ from 'lodash'


const _Menu = (props) => {


    //console.log('menu rendered')

    function panelCall(){
        
        props.setLeftPanelRedux(true)
        return <LeftSideBar/>

    }


//TODO переделать меню. чтобы ссылки были не такая херня, а useNavigate  по нужным местам.
    return (
        <div className={cl.SpaceLayer}>
            <div className={cl.Outer}>


                
                <h3 
                    onClick={panelCall}
                    className={cl.SidePanelCall}
                > 
                <span>  =  </span> 
                </h3>

                { props.sideBarShow 
                    ? <LeftSideBar/>
                    : <p></p>    
                } 

                <Container>
                    <Row>

                        <Col>
                        <div className={cl.searchPanel}>
                            <input 
                                value={props.value}
                                onChange={props.onChange}
                                placeholder={props.placeholder} 
                                style={{marginRight:'7px', marginTop:'5px'}}

                                />  

                        </div>



                        </Col>
                        <Col>
                            <div className={cl.menuPanel}>
                                <Nav.Item>
                                            <Nav.Link href="/main" eventKey="link-1"><span style={{color:'white'}}>Главная </span></Nav.Link>
                                </Nav.Item>
                                <Nav className="justify-content-end"  variant="pills" defaultActiveKey="/home">
                                    <Nav.Item>
                                        <Nav.Link href="/lk" eventKey="link-1"><span style={{color:'white'}}>Пользователь: {localStorage.getItem('SLNUserName') ? localStorage.getItem('SLNUserName') : <span>Login</span>} </span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/userclean"><span style={{color:'white'}}>Сменить пользователя (LogOut)</span></Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                    </Row>

                </Container>



                <div className={cl.MenuBody}>





                </div>


            </div>
        </div>
    );
};

const Menu = React.memo(_Menu)

export default connect(
    //mapStateToProps
    state => ({
        sideBarShow: state.sideBarShow,
        isActualUser: state.isActualUser
    }),

    //mapDispatchToProps
    dispatch => ({
        setLeftPanelRedux: (value) =>{
            dispatch(setLeftSideBarShowAction(value))
        }
    })
)(Menu);