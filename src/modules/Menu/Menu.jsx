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
import { clearAllCookie, getAllCookie, getCookies, setCookies, clearOneCookie, cookieTransormToBoolean } from '../../services/cookieWorksService';


const Menu = (props) => {
    const [user, setUser] = useState('')
    const [isUserVerificated, setIsUserVerificated] = useState(false)
    

    ///////cookie USER
    useEffect(()=>{
        setUser(getCookies('userName'))
        setIsUserVerificated(cookieTransormToBoolean(getCookies('isVerificated')))
    
    },[])
    
   



    function panelCall(){
        
        props.setLeftPanelRedux(true)
        return <LeftSideBar/>

    }



    return (
        <div className={cl.SpaceLayer}>
            <div className={cl.Outer}>


                
                <h3 
                    onClick={panelCall}
                    className={cl.SidePanelCall}
                > = </h3>

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
                            
                            {/* <input placeholder="дата" /> */}

                        </div>

                        </Col>
                        <Col>
                            <div className={cl.menuPanel}>
                                <Nav className="justify-content-end"  variant="pills" defaultActiveKey="/home">
                                    <Nav.Item>
                                        <Nav.Link href="/"><span style={{color:'white'}}>Сменить пользователя</span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/" eventKey="link-1"><span style={{color:'white'}}>Пользователь: {isUserVerificated ? user : <span>Log</span>} </span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/video"><span style={{color:'white'}}>VIDEO</span></Nav.Link>
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