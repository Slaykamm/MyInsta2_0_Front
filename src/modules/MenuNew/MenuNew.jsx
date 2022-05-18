import React from 'react'
import cl from './MenuNew.module.css'
import { connect } from 'react-redux'
import { setLeftSideBarShowAction} from '../../redux/ActionCreators'
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';

function MenuNew(props) {

    const [name, setName] = useState(props.username)
   // const [userToken, setUserToken] = useState(props.useToken)

    const navigate = useNavigate()


    useEffect(()=>{
        localStorage.setItem('SLNUserName', '');
        setName(localStorage.getItem('SLNUserName'))
        localStorage.setItem('SLNToken', '')
    },[])

    useEffect(()=>{
        if (!localStorage.getItem('SLNUserName') &&  !localStorage.getItem('SLNToken')){
            navigate('/login')
        }
        
    },[name])



    function LeftPanelCall(){
        props.setLeftPanelRedux(true)
        return <LeftSideBar/>
    }

    function NavToMain () {
        console.log('Main')
        navigate('/main')
    }

    function NavToUser () {
        navigate('/lk')
    }

    function NavToLogOut () {
        navigate('/login')
            // localStorage.setItem('SLNUserName', '');
            // localStorage.setItem('SLNToken', '')
            }

    

    return (
        <>
        <div className={cl.SpaceLayer}>
            <div className={cl.Outer}>
                
            { props.sideBarShow 
                    ? <LeftSideBar/>
                    : <p></p>    
                } 

                <ul>
                    <li className={cl.Transform}>
                        <span 
                            style={{fontSize:'2rem'}}
                            onClick={LeftPanelCall}
                        >=</span>
                    </li>
                    <li>
                        <input
                            value={props.value}
                            onChange={props.onChange}
                            placeholder={props.placeholder} 
                        />
                    </li>
                    <li className={cl.Transform}>
                        <span
                            onClick={NavToMain}
                        >Главная</span> 
                    </li>
                    <li className={cl.Transform}>
                        <span
                            onClick={NavToUser}
                        >
                             {props.username 
                            ? props.username 
                            : <span>Login</span>}
                        </span>
                    </li>
                    <li className={cl.Transform}>
                        <span
                            onClick={NavToLogOut}
                        >Сменить пользователя (LogOut)</span>
                    </li>

                </ul>
            </div>
        </div>


        </>
    )
}


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
)(MenuNew);