import React, { useEffect } from 'react'
import cl from './Comment.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { convertedFullDate } from '../../../../services/dataConverter'
import { get, filter, map } from 'lodash'
import { useState } from 'react'
import MyModal from '../../../../UI/MyModal/MyModal'
import CommentInput from '../CommentInput/CommentInput'
import DropDown from '../../../../UI/DropDown/DropDown'



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

    const [modal, setModal] = useState(false)
    const [quotedCommentReply, setQuotedCommentReply] = useState('')

    const [modalEdit, setModalEdit] = useState(false)
    const [editComment, setEditComment] = useState(props.text)

     
    // useEffect(()=>{
    //     setQuotes(get((filter(commentQuote, id={id})),['0', 'quotedCommentID']))
    // },[])

    function ReplyTransition(e) {
        e.preventDefault();
        setModal(false)
        commentReply(props.user, props.text, props.date, quotedCommentReply)
    }

    function EditTransition(e){
        e.preventDefault();
        setModalEdit(false)
        commentEdit(id, props.user, editComment, props.date)
    }

    function DeleteTransition(e){
        commentDelete(id)
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
                   // onClickCancel={setModal(false)}
                />

            </MyModal>

            <MyModal
                visible={modalEdit}
                setVisible={setModalEdit}
            >
                <CommentInput
                    value={editComment}
                    onChange={e => setEditComment(e.target.value)}
                    onClick={e => EditTransition(e)}
                   // onClickCancel={setModalEdit(false)}
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
                    <p></p>
                </div>


                <div className={cl.ButtonCollection}>

                    <DropDown
                    setModal={setModal}
                    setModalEdit={setModalEdit}
                    user={props.user}
                    id={props.id}
                    commentEdit={commentEdit}
                    commentDelete={DeleteTransition}
                    commentPrivateMessege={commentPrivateMessege}

                    />

 
                </div>

            </div>        
        
        
        </>

    )
}

export default Comment

