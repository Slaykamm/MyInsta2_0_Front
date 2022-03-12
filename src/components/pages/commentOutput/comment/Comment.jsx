import React, { useEffect } from 'react'
import cl from './Comment.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { convertedFullDate } from '../../../../services/dataConverter'
import { get, filter, map } from 'lodash'
import { useState } from 'react'
import MyModal from '../../../../UI/MyModal/MyModal'
import CommentInput from '../CommentInput/CommentInput'



function Comment({
                commentReply,
                commentPrivateMessege,
                commentEdit,
                commentDelete,
                commentQuote,
                usersDict,
                comment,
                id,
                ...props
            }) {

    const [quotes, setQuotes] = useState([])
    const [qRender, setQRender] = useState([])
    const [modal, setModal] = useState(false)
    const [quotedCommentReply, setQuotedCommentReply] = useState('')

    const qArt = []
    
    useEffect(()=>{
        setQuotes(get((filter(commentQuote, id={id})),['0', 'quotedCommentID']))
        console.log('date1',props.date)
        console.log('date', get(comment, ['quote', 'date']))
        console.log('user', get(comment, ['quote', 'user']))
        console.log('text', get(comment, ['quote', 'text']))

    },[])

    




    function ReplyTransition(e) {
        e.preventDefault();
        setModal(false)
        
        commentReply(props.user, props.text, props.date, quotedCommentReply)
    }

    return (
        <>

            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <CommentInput
                    value={quotedCommentReply}
                    onChange={e => setQuotedCommentReply(e.target.value)}
                    onClick={e => ReplyTransition(e)}
              
                />
            </MyModal>


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

                    {comment.quote 
                    ? <div className={cl.Quotation}>
                        <span>Цитата</span>
                        {console.log("test", qArt )}
                            <p>
                                Пользователь:  {get(comment, ['quote', 'user']) + ".    "}
                                Опубликовано:  {get(comment, ['quote', 'date'])}
                            </p> 
                            <p>
                                {get(comment, ['quote', 'text'])}
                            </p> 

                        </div>

                    : <p></p>
                    
                    }
                    

                    <div className={cl.postDate}>Опубликовано: {convertedFullDate(props.date)}</div>
                    <div><span>{props.text}</span></div>
                    
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
                            {/* commentReply(props.user, props.text, props.date) */}
                            <Dropdown.Item 
                                onClick={e => setModal(true)}
                                >
                                    Ответить
                            </Dropdown.Item>
                            { props.user == localStorage.getItem('SLNUserName') 
                            ?   <div>
                                    <Dropdown.Item 
                                        onClick={id => commentEdit(props.id)}
                                        >
                                            Редактировать</Dropdown.Item>
                                    <Dropdown.Item 
                                        onClick={id => commentDelete(props.id)}
                                        >
                                            Удалить</Dropdown.Item>
                                </div>
                            :   <div>
                                    <Dropdown.Divider />
                                    <Dropdown.Item 
                                        onClick={id => commentPrivateMessege(props.id, props.user)}
                                        >
                                            Отправить личное сообщение автору</Dropdown.Item>
                                </div>
                        }
                        </DropdownButton>
                        ))}
                    </div>
                </div>

            </div>        
        
        
        </>

    )
}

export default Comment

