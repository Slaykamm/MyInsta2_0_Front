import React, { useEffect, useState, useMemo, useRef } from 'react'
import { filter, sortBy, get } from 'lodash'
import cl from './PrivateMessageContainer.module.css'
import MyModalChat from './ModalChat/ModalChat'
import MyModalChatContainer from './ModalChat/MyModalChatContainer/MyModalChatContainer'
import CommentInput from '../../../../components/pages/commentOutput/CommentInput/CommentInput'
import { connect } from 'react-redux'
import { getUsersDict, getUserRoom} from  '../../../../redux/Selectors/baseSelectors'

import MyModal from '../../../../UI/MyModal/MyModal'
import { getPrivateRoomNameFromIndexesService } from '../../../../services/roomNamesService'

import { getUserDictAPI } from '../../../../API/getUserDictAPI'
import { postRoomAPI } from '../../../../API/postPrivateRoomAPI'
import { postMessageAPI } from '../../../../API/postPrivateMessage'
import { putToBaseAPI } from '../../../../API/putToBaseAPI'
import { getPutToBaseResult } from '../../../../redux/Selectors/baseSelectors'
import MyPrivateWhispModule from '../../../../modules/MyPrivateWhispModule/MyPrivateWhispModule'

import { getPrivateRooms } from '../../../../redux/Selectors/privateRoomsSelector'
import { getPrivateRoomsAPI } from '../../../../API/getPrivateRoomsAPI'
import CommentInputRef from '../../../../modules/CommentInputRef/CommentInputRef'


function _PrivateMessageContainer({
    privateMessageEdit,
    privateMessageDelete, 
    setReplyPrivate, 
    //replyPrivateMessage, 
    replyPrivate, 
    privateReply, 
    user, 
    text, 
    avatar, 
    newMessages, 
    messages, 
    ID, 
    userID,
    ...props}) {

// тест реф


    const [modal, setModal] = useState(false)
    const [replyPrivateWithQuotation, setReplyPrivateWithQuotation] = useState(true)
    const [privateMessage, setPrivateMessage] = useState('')
    const [wss, setWss] = useState(null)
    const [wsIncomeMessage, setWsIncomeMessage] = useState()
    const replyBodyRef = useRef();  

    const usersDict = JSON.parse(window.localStorage.getItem('usersDict'))
    function startChat(id){
        setModal(true)

        const ws = new WebSocket('ws://127.0.0.1:8000/api/prvatemessages/')
        setWss(ws)
            ws.onopen = () => {
                // on connecting, do nothing but log it to the console
                console.log('connected')
                }
            ws.onmessage = evt => {
                setWsIncomeMessage(evt.data)
            }
            ws.onclose = () => {
                console.log('disconnected')
                // automatically try to reconnect on connection loss
            }

        const message = {
            "lastOpenDate": new Date().toISOString() 
        }
        const url = '/privaterooms'
        props.putToBase(message, url, id)
            //console.log('TODO ОБНОВЛЯЕМ ДАТУ ЗАХОДА В КОМНАТУ')

    }

    useEffect(()=>{
        if (wsIncomeMessage){
            const newReplyMessage = JSON.parse(wsIncomeMessage);
            privateReply(ID, newReplyMessage) 
            replyBodyRef.current.value = ''

        }
    },[wsIncomeMessage])

// Так: во первых есть сенд! во вторых долен быть ресив. в этом случае доренривать сообщения. менять пропсы. все тут делать.

        function ReplyPrivateTransition(e){
            e.preventDefault();
            const newPrivateMessage = {
                id: new Date().toISOString(), 
                create_at: new Date().toISOString(), 
                user: userID,
                author: userID,
                privateRoom: ID,
                // text: replyPrivateMessage
                text: replyBodyRef.current.value
                }        

            try {
                wss.send(JSON.stringify(newPrivateMessage)) //send data to the server
            }catch (error) {
                console.log(error) // catch error
            }

        }               

        function ReplyPrivateTransitionWithQuotation(e){
            e.preventDefault();
            replyPrivate(user, text, date, userReply) 
        }

 
        // этим эффектом рвем сокет соединение, т.к вышли из чат рум
        useEffect(()=> {
            if (!modal && wss){
                wss.close()
                setWss(null)
            }

        }, [modal])
    

    return (
        <>

                 {/* блока приватных сообщений КОТОРЫЕ БЫЛИ */}
        <MyModalChat
            visible={modal}
            setVisible={setModal}
        >

            {sortBy(filter(messages, {'privateRoom':ID}),['create_at']).map(message=>
                <MyModalChatContainer
                user={user}
                roomMessage={message}
                create_at={message.create_at}
                roomID={ID}
                key={message.id}
                avatar={get(filter(usersDict, {'username': user}),[0, 'avatar'])}
                author={message.author}
                privateMessageDelete={privateMessageDelete}
                privateMessageEdit={privateMessageEdit}
                replyPrivateWithQuotation={replyPrivateWithQuotation}
                />                  
                
            )}

            <CommentInputRef
                    ref={replyBodyRef}
                    onClick={e => ReplyPrivateTransition(e)}
                    isMultipyChat={false}
            /> 

        </MyModalChat>


        <div 
            onClick={e => startChat(ID)} 
            className={cl.Container}>

            <div className={cl.userInfo}>

                {avatar 
                        ? <span> <img src={avatar} alt='avatar'/></span>
                        : <span><img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='avatar'/></span>
                    }


            </div>

            <div className={cl.textInfo}>
                <div>
                    Пользователь: {user}
                </div>
                <div className={cl.cuttedText}>
                    {text && newMessages
                    ? <span>Непрочитанное: {text}</span>
                    : <span></span>
                    }
                </div>
                <div>
                    {newMessages
                    ?  <span style={{fontWeight:'bold'}}>Новых сообщений: {newMessages}</span>
                    :  <span>Нет новых сообщений</span>
                    }
                </div>
            </div>
        </div>       
        </>
    )
}

const PrivateMessageContainer = React.memo(_PrivateMessageContainer)

export default connect(
    //mapStateToProps
    state => ({
        userRoom: getUserRoom(state),
        newMessageSucces: state.postUserRoom,
        privateMessageSucces: state.postUserPrivate,
        putToBaseResult: getPutToBaseResult(state),
        usersPrivateRooms: getPrivateRooms(state),
    }),
    //mapDispatchToProps
    dispatch => ({
        postPrivateRoom: (value, text, userID) => {
            dispatch(postRoomAPI(value, text, userID))
        },
        postPrivateMessage: (roomID, roomName, message, userID) => {
            dispatch(postMessageAPI(roomID, roomName, message, userID))
        },
        putToBase: (value, url, id) => {
            dispatch(putToBaseAPI(value, url, id))
        },
        getPrivateRooms: (value) => {
            dispatch(getPrivateRoomsAPI(value))
        },
    })
    
)(PrivateMessageContainer)