import React from 'react'
import cl from './Comment.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { convertedTime, convertedDate, convertedFullDate } from '../../services/dataConverter'


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
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" style={{background:'#444653', zIndex:'2'}} >
                    ...
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark" style={{zIndex:'1'}}>
                        <Dropdown.Item href="#/action-1" active>
                            Ответить
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Редактировать</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Удалить</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4">Написать личное сообщение автору</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </div>        
        
        
        </>


    )
}

export default Comment

