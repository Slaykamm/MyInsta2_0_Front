import React from 'react'
import MyButton from '../../../../UI/MyButton/MyButton'


function CommentInput({value, onClick, ...props}) {
    return (
        <>
        <form>
            <textarea  
                style={{width:'100%', height:'5rem'}}
                value={value}
                {...props}
            />
            <MyButton onClick={onClick}>Click Me</MyButton>
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