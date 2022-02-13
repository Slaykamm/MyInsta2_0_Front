import React from 'react'
import { useState } from 'react'
import cl from './СommentOutput.module.css'
import Table from 'react-bootstrap/Table'
import { reduxForm } from 'redux-form';
import CommentForm from './commentFormRedux/CommentForm';
import { getCookies } from '../../services/cookieWorksService';







function CommentOutput() {

    let currentTime = new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now())

    const [comments, setComments] = useState([
        {id: 1, date: currentTime, authorId: 35, authorName: 'Steve', content: 'Really good video.Really good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good videoReally good video'},
        {id: 2, date: currentTime, authorId: 14, authorName: 'Olga', content: 'Really good video.'},
        {id: 3, date: currentTime, authorId: 22, authorName: 'Pit', content: 'Really good video.'},
        {id: 4, date: currentTime, authorId: 335, authorName: 'Mike', content: 'Really good video.'},
        {id: 5, date: currentTime, authorId: 315, authorName: 'Eugene', content: 'Really good video.'}
    ])

console.log(currentTime, comments)
    
    //работа с формой
    const CommentReduxForm = reduxForm({
        form: 'comment'
    }) (CommentForm)       

    const addComment = (formData) => {
       let additionPost = {id: Date.now(), date: currentTime, authorId: getCookies('userName'), authorName: getCookies('userName'), content: formData.commentInput}
       setComments([additionPost, ...comments])  
    }
 
    console.log("testtest", comments)
    return (
        <div className={cl.BaseLine}>
            <p>Hello World</p>

                <div className={cl.CommentField}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Дата:</th>
                                <th>Автор:</th>
                                <th>Текст:</th>
                            </tr>

                        </thead>

                        <tbody>
                            {comments.map(comment => <tr key={comment.id}>
                                <td>{comment.date}</td>
                                <td>{comment.authorName}:</td>
                                <td>{comment.content}</td>
                            </tr>

                            )}
                            
                        </tbody>
                    </Table>
                </div>
            <CommentReduxForm
                onSubmit={addComment}/>


        </div>

    )
}

export default CommentOutput
