import React from 'react'
import { useState } from 'react'
import cl from './СommentOutput.module.css'
import Table from 'react-bootstrap/Table'
import { reduxForm } from 'redux-form';
import CommentForm from './commentFormRedux/CommentForm';
import { getCookies } from '../../../services/cookieWorksService';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCommentsThunkAPI } from '../../../API/getCommentsAPI'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { filter } from 'lodash'
import Comment from '../comment/Comment'







function CommentOutput(props) {

    let currentTime = new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now())

    const [comments, setComments] = useState([


    ])


    //TODO сделать рефактор. передавать словарь в пропсах
    useEffect(()=>{
        props.getCommentsAPI(props.videoID),
        props.getUsersDict()
    },[])

    useEffect(()=>{
        setComments(props.comments)
    },[props.comments])



    
    //работа с формой
    const CommentReduxForm = reduxForm({
        form: 'comment'
    }) (CommentForm)       

    const addComment = (formData) => {
       let additionPost = {id: Date.now(), date: currentTime, authorId: getCookies('userName'), authorName: getCookies('userName'), content: formData.commentInput}
       setComments([additionPost, ...comments])  
    }

    //видимо тут должен быть POST на сервер. TODO thunk POST 
 
   if (comments.length && props.usersDict.length) {
         comments.map(comment =>
            
            {
            console.log('comments', comments)
            console.log('comment', comment)
            console.log('key', comment.id)
            console.log('date', comment.create_at)
            console.log('props.usersDict', props.usersDict)
            console.log('comment.author', comment.author)
            console.log('filter, ', filter(props.usersDict, {'id': comment.author})[0])
            console.log('user', filter(props.usersDict, {'id': comment.author})[0].name)
            console.log('avatar', (filter(props.usersDict, {'id': comment.author})[0].avatar))
            console.log('text', comment.id)
            }
         )
           
   }
    


    return (
        <div className={cl.BaseLine}>
            
            {comments.length && props.usersDict.length 
                    ?   <div>
                            <h2 style={{color:'grey'}}>Ваши комментарии</h2>
                            {comments.map(
                                comment => <Comment 
                                                key={comment.id} 
                                                date={comment.create_at} 
                                                user={filter(props.usersDict, {'id': comment.author})[0].name} 
                                                avatar={filter(props.usersDict, {'id': comment.author})[0].avatar} 
                                                text={comment.text}
                                            />
                            )}
                        </div>
                    : <h3>Пока нет комментариев к данному видео</h3>
            }




            <CommentReduxForm
                onSubmit={addComment}/>


        </div>

    )
}

export default connect(
    //mapStateToProps
    state => ({
        comments: state.getComments,
        usersDict: state.usersDict
    }),
    //mapDispatchToProps
    dispatch => ({
        getCommentsAPI: (value) => {
            dispatch(getCommentsThunkAPI(value))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        }
    })

)(CommentOutput)

