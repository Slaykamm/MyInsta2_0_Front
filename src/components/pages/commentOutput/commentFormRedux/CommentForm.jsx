import React from 'react'
import cl from './CommentForm.module.css'
import { Field } from 'redux-form'

function CommentForm(props) {
    function butPrevent(event){
        event.preventDefault();

    }

    return (
        <>

        <form onSubmit={props.handleSubmit}>
            <div className={cl.EnterCommentField}>

                <Field
                name={'commentInput'}
                type='text'
                placeholder='Ваш комментарий'
                component={'input'}
                
                />
                <br/>
                <button

                >
                    Комментировать</button>
            </div>
        </form>        
        
        </>

    )
}

export default CommentForm
