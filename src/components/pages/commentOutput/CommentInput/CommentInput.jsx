import React from 'react'
import MyButton from '../../../../UI/MyButton/MyButton'
import MyRedButton from '../../../../UI/MyRedButton/MyRedButton'
import MySelect from '../../../../UI/Myselect/MySelect'
import cl from './CommentInput.module.css'
import { 
    get, 
    includes  
} from 'lodash'
import { useEffect, useState } from 'react'


function CommentInput({
    value, 
    onClick, 
    onClickCancel, 
    isMultipyChat,
    filteredUsers,
    addUserChange,
    removeUserChange,
    usersArray,
    groupMembers,
    notGroupMembers,
    ...props
}) {

    function addUserChangeProcessing(value) {
        addUserChange(usersArray, value)
    }

    function removeUserChangeProcessing(value) {
        removeUserChange(value)
    }


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
            { isMultipyChat && groupMembers && notGroupMembers
                ?   <div>
                        <div>

                            <MySelect
                                onChange={addUserChangeProcessing}
                                
                                defaultValue="Пользователи на форуме"
                                options={notGroupMembers}
                            /> 
                            <span style={{marginLeft:'20px'}}>
                                <MyButton>Добавить в группу</MyButton>
                            </span> 
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <MySelect
                                onChange={removeUserChangeProcessing}
                                
                                defaultValue="Мемберы группы"
                                options={groupMembers}
                            /> 
                            <span style={{marginLeft:'20px'}}>
                                <MyRedButton>Удалить из группы</MyRedButton>
                            </span>
                        </div>
                    </div>
                : <span></span> 
            }

        </form>
        </>
    )
}

export default CommentInput

