import React from 'react'
import { useState } from 'react'
import cl from './СommentOutput.module.css'
import Table from 'react-bootstrap/Table'
import { reduxForm } from 'redux-form';
import CommentForm from './commentFormRedux/CommentForm';
import { getCookies } from '../../services/cookieWorksService';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCommentsThunkAPI } from '../../../API/getCommentsAPI'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { filter } from 'lodash'







function CommentOutput(props) {

    let currentTime = new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now())

    const [comments, setComments] = useState([
        {id: 1, date: currentTime, authorId: 35, authorName: 'Steve', content: 'Really good video.Really good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good video'},
        {id: 2, date: currentTime, authorId: 14, authorName: 'Olga', content: 'Really good video.'},
        {id: 3, date: currentTime, authorId: 22, authorName: 'Pit', content: 'Really good video.'},

    ])

    //TODO сделать рефактор. передавать словарь в пропсах
    useEffect(()=>{
        props.getCommentsAPI(),
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
 



    return (
        <div className={cl.BaseLine}>
            <p>Hello World</p>


                <div className={cl.CommentField}>

                {comments && props.usersDict.length
                    ?  
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Дата:</th>
                                    <th>Автор:</th>
                                    <th>Текст:</th>
                                </tr>
                            </thead>

                            <tbody>
                                        {comments.map(
                                            comment => <tr key={comment.id}>
                                                <td>{Date(comment.create_at)}</td>
                                                <td>{filter(props.usersDict, {'id': comment.author})[0].name}</td>
                                                <td>{comment.text}</td>
                                        </tr>
                                        
                                        )}

                                
                            </tbody>
                        </Table>
                    : <p>Пока нет комментариев.</p>
                }
                </div>
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
        getCommentsAPI: () => {
            dispatch(getCommentsThunkAPI())
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        }
    })

)(CommentOutput)

