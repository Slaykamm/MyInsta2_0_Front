import React from 'react'
import MyButton from '../../../../UI/MyButton/MyButton'
import cl from './CommentInput.module.css'


function CommentInput({value, onClick, onClickCancel, ...props}) {
    return (
        <>
        <form>
            <textarea className={cl.InputArea} 
                style={{width:'100%', height:'5rem'}}
                value={value}
                {...props}
            />
            <div className={cl.ButtonsGroup} >
                <MyButton onClick={onClick}>Ответить</MyButton>
                <MyButton onClick={onClickCancel}>Отмена</MyButton>
            </div>

        </form>
        </>
    )
}

export default CommentInput


const aaaa = (aa) => {
    return(
        console.log(aa*2)
    )
    
}