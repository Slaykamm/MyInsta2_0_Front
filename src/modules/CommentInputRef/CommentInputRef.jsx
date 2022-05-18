import React from 'react'
import MyButton from '../../UI/MyButton/MyButton'
import MyRedButton from '../../UI/MyRedButton/MyRedButton'
import MySelect from '../../UI/Myselect/MySelect'
import cl from './CommentInputRef.module.css'
import { 
    get, 
    includes  
} from 'lodash'
import { useEffect, useState } from 'react'


const _CommentInputRef = React.forwardRef(({
    value, 
    onClick, 
    onClickCancel, 
    isMultipyChat,
    addUserChange,
    removeUserChange,
    usersArray,
    groupMembers,
    notGroupMembers,
    ...props
}, ref) => {


    // console.log('CommentInput rendered')
    const [addUserSelect, setAddUserSelect] = useState()
    const [removeUserSelect, setRemoveUserSelect] = useState()

    function addUserChangeProcessing(e) {
        e.preventDefault()
        addUserChange(usersArray, addUserSelect)
    }

    function removeUserChangeProcessing(e) {
        e.preventDefault()
        removeUserChange(removeUserSelect)
    }


    return (
        <>
        <form>
            <textarea className={cl.InputArea} 
                style={{width:'100%', height:'5rem'}}
                //value={value}
                ref={ref}
                {...props}
            />
            <div className={cl.ButtonsGroup} >
                <MyButton onClick={onClick}>Ответить</MyButton>
                <MyButton onClick={onClickCancel}>Отмена</MyButton>
            </div>
            { isMultipyChat && groupMembers && notGroupMembers
                ?   <div>
                        <div>

                            <MySelect
                                onChange={e => setAddUserSelect(e)}
                                
                                defaultValue="Пользователи на форуме"
                                options={notGroupMembers}
                            /> 
                            <span style={{marginLeft:'20px'}}>
                                <MyButton
                                    disabled={!!!addUserSelect}
                                    onClick={e => addUserChangeProcessing(e)}
                                >Добавить в группу</MyButton>
                            </span> 
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <MySelect
                                onChange={e => setRemoveUserSelect(e)}
                                
                                defaultValue="Мемберы группы"
                                options={groupMembers}
                            /> 
                            <span style={{marginLeft:'20px'}}>
                                <MyRedButton
                                disabled={!!!removeUserSelect}
                                onClick={e => removeUserChangeProcessing(e)}
                                >Удалить из группы</MyRedButton>
                            </span>
                        </div>
                    </div>
                : <span></span> 
            }

        </form>
        </>
    )
})

const CommentInputRef = React.memo(_CommentInputRef)
export default CommentInputRef

