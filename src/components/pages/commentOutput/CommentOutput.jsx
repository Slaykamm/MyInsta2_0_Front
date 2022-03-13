import React, { useRef } from 'react'
import { useState } from 'react'
import cl from './СommentOutput.module.css'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCommentsThunkAPI } from '../../../API/getCommentsAPI'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { filter, get} from 'lodash'
import Comment from './comment/Comment'
import { useNavigate } from 'react-router-dom'
import CommentInput from './CommentInput/CommentInput';
import { convertedFullDate } from '../../../services/dataConverter';



function CommentOutput(props) {
    const [userName, setUserName] = useState('')
    const [comments, setComments] = useState([])
    const [replyComment, setReplyComment] = useState('')
    const [commentQuote, setCommentQuote] = useState({})
    const [editedComment, setEditedComment] = useState({})


    const navigate = useNavigate()


    //TODO сделать рефактор. передавать словарь в пропсах
    useEffect(()=>{ 
        props.getCommentsAPI(props.videoID, localStorage.getItem('SLNToken')),
        props.getUsersDict()
    },[localStorage.getItem('SLNToken')])

 

    //обрабатываем ошибку авториации)
    useEffect(()=>{
        if (get(props.comments, [0, 'status']) == 401) {
            console.log("FROM COMMENTS", get(props.comments, [0, 'status']))
            //navigate("/login")
            setComments()  
        }
        else {
            setComments(get(props.comments, [0, 'data']))

            
        }
    },[props.comments])

    // получаем имя из ЛокалСторажд
    useEffect(()=>{
        setUserName(localStorage.getItem('SLNUserName'))
       
    },[])


    //видимо тут должен быть POST на сервер. TODO thunk POST  ++

    
    function commentReply(user, text, date, userReply){
        const quote = {
            user: user,
            text: text,
            date: convertedFullDate(date),
        }

        let additionWithCommentPost = {
                    id: new Date().toISOString(), 
                    create_at: new Date().toISOString(), 
                    author:  filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id, 
                    quote: quote,
                    text: userReply
                }
        setComments([ ...comments, additionWithCommentPost]) 
        setReplyComment('')  
    }

    // ++ простой коммент
    function printComment(e){
        e.preventDefault();

        console.log('commentQuote', commentQuote)


        let additionPost = {
                    id: new Date().toISOString(), 
                    create_at: new Date().toISOString(), 
                    author:  filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id, 
                    text: replyComment
                }
        setComments([ ...comments, additionPost]) 
        setReplyComment('')          
    }
    

    //EDIT ++
    function commentEdit(id, user, text, date){
        const editedComments = filter(comments, {id:id})
        editedComments[0].text = text
        setEditedComment(editedComments)
    }

    // DELETE COMMENT ++
    function commentDelete(id){
        const newComments = comments.filter(com => com.id !== id)
        console.log('commentDelete with comment ID', id, newComments)
        setComments(comments.filter(com => com.id !== id))
        
    }


    //PRIVATE --

    function commentPrivateMessege(id, user){
        console.log('commentPrivateMessege with comment ID and UserName ', id, user )
    }


    return (
        <div className={cl.BaseLine}>
            

            {comments && props.usersDict.length && userName
                    ?   <div>
                            <h2 style={{color:'grey'}}>Ваши комментарии</h2>
                            {comments.map(
                                comment => <Comment 
                                                key={comment.id} 
                                                date={comment.create_at} 
                                                user={filter(props.usersDict, {'id': comment.author})[0].username} 
                                                avatar={filter(props.usersDict, {'id': comment.author})[0].avatar} 
                                                text={comment.text}
                                                id={comment.id}
                                                usersDict={props.usersDict}
                                                comment = {comment}
                                                commentReply={commentReply}
                                                commentPrivateMessege={commentPrivateMessege}
                                                commentEdit={commentEdit}
                                                commentDelete={commentDelete}

                                            />
                            )}
                        </div>
                    : <h3>Пока нет комментариев к данному видео</h3>
            }

            <hr/>


            {/* <CommentReduxForm 
            onSubmit={addComment}/> */}
            <CommentInput

                value={replyComment}
                onChange={e => setReplyComment(e.target.value)}
                onClick={printComment}
                
                />



        </div>

    )
}

export default connect(
    //mapStateToProps
    state => ({
        comments: state.getComments,
        usersDict: state.usersDict,
        userToken: state.userToken
    }),
    //mapDispatchToProps
    dispatch => ({
        getCommentsAPI: (videoID, userToken) => {
            dispatch(getCommentsThunkAPI(videoID, userToken))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        }
    })

)(CommentOutput)

