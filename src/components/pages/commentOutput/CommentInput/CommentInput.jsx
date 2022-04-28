import React from 'react'
import MyButton from '../../../../UI/MyButton/MyButton'
import MyRedButton from '../../../../UI/MyRedButton/MyRedButton'
import MySelect from '../../../../UI/Myselect/MySelect'
import cl from './CommentInput.module.css'
import { get } from 'lodash'


function CommentInput({
    value, 
    onClick, 
    onClickCancel, 
    isMultipyChat,
    filteredUsers,
    ...props
    
}) {
// get(filteredUsers, ['username'])
    console.log('filteredUsers', filteredUsers)

    const printUser = (value) => console.log('user',  value)

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
            { isMultipyChat 
                ?   <div>
                        <div>

                            <MySelect
                                onChange={printUser}
                                
                                defaultValue="Пользователи на форуме"
                                options={filteredUsers}
                            /> 
                            <span style={{marginLeft:'20px'}}>
                                <MyButton>Добавить в группу</MyButton>
                            </span> 
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <MySelect
                                onChange={printUser}
                                
                                defaultValue="Мемберы группы"
                                options={filteredUsers}
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

