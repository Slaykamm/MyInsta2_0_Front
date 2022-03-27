import React from 'react'
import cl from './MyModalChatContainer.module.css'
import { get, filter } from 'lodash'
import { convertedFullDate } from '../../../../../../services/dataConverter'
import DropDown from '../../../../../../UI/DropDown/DropDown'
import { useState } from 'react'
import MyModal from '../../../../../../UI/MyModal/MyModal'
import CommentInput from '../../../../commentOutput/CommentInput/CommentInput'

function MyModalChatContainer({privateMessageEdit, privateMessageDelete, author, create_at, avatar, usersDict, user, roomMessage, roomID, replyPrivateWithQuotation, ...props}) {
    const [modal, setModal] = useState(false)


    const [modalEdit, setModalEdit] = useState(false)
    const [editMessage, setEditMessage] = useState(roomMessage.text)


    function EditTransition(e){
        e.preventDefault();
        setModalEdit(false)
        privateMessageEdit(roomMessage.id, editMessage)
    }

    function DeleteTransition(e){
        e.preventDefault();
        privateMessageDelete(roomMessage.id)
    }



    return (
        <>
                <div className={cl.commentContainer}>
                    <div className={cl.userInfo}>
                        <div >
                            <img style={{height:'50px'}} src={get(filter(usersDict, {'author': author}),[0,'avatar'])}/>
                        </div>
                        <div>
                            <span>{get(filter(usersDict, {'author': author}),[0,'username'])}</span>  
                                              
                        </div>
                </div>

                <div className={cl.Context}>

                    <div className={cl.postDate}>Опубликовано: {convertedFullDate(create_at)}</div>
                    <div><span>{roomMessage.text}</span></div>
                    <p></p>
                </div>




                <div className={cl.ButtonCollection}>
                
                    { localStorage.getItem('SLNUserName') === get(filter(usersDict, {'author': author}),[0,'username'])
                        ?
                            <DropDown
                            setModal={setModal}
                            setModalEdit={setModalEdit}
                            user={get(filter(usersDict, {'author': author}),[0,'username'])}
                            id={roomID}
                            privatwsageEdit={EditTransition}
                            commentDelete={DeleteTransition}
                            commentPrivateMessege={null}
                            replyPrivateWithQuotation={replyPrivateWithQuotation}
                            />
                      
                        : <span></span>
                    

                    }



                </div>


                <MyModal
                visible={modalEdit}
                setVisible={setModalEdit}
                >
                    <CommentInput
                        value={editMessage}
                        onChange={e => setEditMessage(e.target.value)}
                        onClick={e => EditTransition(e)}
                    // onClickCancel={setModalEdit(false)}
                    />

                </MyModal>




            </div>        


        </>
    )
}

export default MyModalChatContainer
