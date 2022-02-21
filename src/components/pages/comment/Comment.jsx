import React from 'react'
import cl from './Comment.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { convertedTime, convertedDate, convertedFullDate } from '../../../services/dataConverter'


function Comment(props) {

    return (
        <>



            <div className={cl.commentContainer}>
                <div className={cl.userInfo}>
                    <div>
                        <img src={props.avatar}/>
                    </div>
                    <div>
                        <span>{props.user}</span>                        
                    </div>

                </div>

                <div className={cl.Context}>
                    <div className={cl.postDate}>Опубликовано: {convertedFullDate(props.date)}</div>
                    <div>{props.text}</div>
                    
                </div>

                <div className={cl.ButtonCollection}>

                    <div className="mb-2" >
                        {['start'].map((direction) => (
                        <DropdownButton
                            
                            key={direction}
                            id={`dropdown-button-drop-${direction}`}
                            drop={direction}
                            variant="secondary"
                            title='...'
  
                        >

                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">Отправить личное сообщение автору</Dropdown.Item>
                        </DropdownButton>
                        ))}
                    </div>

                    {/* <Dropdown>
                        <Dropdown.Toggle 
                            id={`dropdown-button-drop-start`}
                            drop={'start'}
                            variant="secondary" 
                            style={{background:'#444653', zIndex:'2', backgroundColor:'transparent', color:'#444653'}} 
                            key={'start'}
                        >
                    ...
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark" style={{zIndex:'1'}}>
                        <Dropdown.Item href="#/action-1" active style={{backgroundColor:'#444653'}}>
                            Ответить
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Редактировать</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Удалить</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4">Написать личное сообщение автору</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </div>

            </div>        
        
        
        </>


    )
}

export default Comment

