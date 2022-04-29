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

    function addUserChange12(value) {
        addUserChange(usersArray, value)
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
                                onChange={addUserChange12}
                                
                                defaultValue="Пользователи на форуме"
                                options={notGroupMembers}
                            /> 
                            <span style={{marginLeft:'20px'}}>
                                <MyButton>Добавить в группу</MyButton>
                            </span> 
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <MySelect
                                onChange={removeUserChange}
                                
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

