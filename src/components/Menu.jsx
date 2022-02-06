import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux'
import { setLeftSideBarShowAction, setLeftSideBarHideAction} from '../redux/ActionCreators'

import cl from './CSS/Menu.module.css'



import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LeftSideBar from '../modules/LeftSideBar/LeftSideBar';
import _ from 'lodash'
import axios from 'axios';



const Menu = (props) => {

    const [namerFilter, setNameFilter] = useState('')






    function nameFilterProc(name) {

        setNameFilter(name)
        if (name.length >3 && name.length<10){
            console.log("name", name)
// устанавливаю лоадаш. получаю тут массив с картинками. фильтрую в них название.



        }
    }


    function panelCall(){
        
        props.setLeftPanelRedux(true)
        return <LeftSideBar/>

    }
    console.log('props', props.isActualUser)


    return (
        <div>
            <div className={cl.Outer}>


                
                <h3 onClick={panelCall}> =</h3>

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
                                placeholder="название" 
                                style={{marginRight:'7px', marginTop:'5px'}}/>  
                            
                            <input placeholder="дата" />
                            <button>Фильтр</button>
                        </div>

                        </Col>
                        <Col>
                            <div className={cl.menuPanel}>
                                <Nav className="justify-content-end"  variant="pills" defaultActiveKey="/home">
                                    <Nav.Item>
                                        <Nav.Link href="/">LogIn</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="main/" eventKey="link-1"><span style={{color:'white'}}>Пользователь: {props.isActualUser.UserLogin} </span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="disabled" disabled>
                                        Disabled
                                        </Nav.Link>
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