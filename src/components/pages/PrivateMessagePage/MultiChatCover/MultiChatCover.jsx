import React, { useEffect } from 'react'
import cl from './MultiChatCover.module.css'
import { 
    get, 
    filter, 
    sortBy, 
    includes, 
    lowerCase, 
    toNumber,
    without,
    map,
} from 'lodash'
import MyModalChat from '../PrivateMessageContainer/ModalChat/ModalChat'
import CommentInput from '../../../../components/pages/commentOutput/CommentInput/CommentInput'
import { useState } from 'react'
import MyModalChatContainer from '../PrivateMessageContainer/ModalChat/MyModalChatContainer/MyModalChatContainer'
import { getIndexesFromMultyUsersRoomNameService, getMultyUsersRoomNameFromIndexesService } from '../../../../services/roomNamesService'

 

function MultiChatCover({
    usersDict, 
    user, 
    text, 
    newMessages, 
    messages, 
    usersArray,
    setReplyPrivate, 
    replyPrivateMessage, 
    privateReply, 
    privateMessageDelete, 
    privateMessageEdit,
    filteredUsers,
    ID, 
    userID,
    roomName,
    putToBase,
    putToBaseResult,
    ...props}) {




    const [modal, setModal] = useState(false)
    const [replyPrivateWithQuotation, setReplyPrivateWithQuotation] = useState(true)
    const [groupMembers, setGroupMembers] = useState()
    const [notGroupMembers, setNotGroupMembers] = useState()
    const [wss, setWss] = useState(null)
    const [wsIncomeMessage, setWsIncomeMessage] = useState()


    function startChat(id){
        let groupMembers = []
        let notGroupMembers = []
        map(filteredUsers, user => {
            if (includes(usersArray, user.id)){
                groupMembers.push(user)
            } else {
                notGroupMembers.push(user)
            }
        })
        setGroupMembers(sortBy(groupMembers, lowerCase(['username'])))
        setNotGroupMembers(sortBy(notGroupMembers, lowerCase(['username'])))
        setModal(true)
// web sockets initialize here

        const ws = new WebSocket('ws://127.0.0.1:8000/api/prvatemessages/')
        setWss(ws)
            ws.onopen = () => {
                console.log('connected')
                }
            ws.onmessage = evt => {
                setWsIncomeMessage(evt.data)

            }
            ws.onclose = () => {
                console.log('disconnected')
            }
    }

    useEffect(()=>{
        if (wsIncomeMessage){
            const newReplyMessage = JSON.parse(wsIncomeMessage);
            console.log('from WS', newReplyMessage);
            privateReply(ID, newReplyMessage) 
        }
    },[wsIncomeMessage])


    function ReplyPrivateTransition(e){
        e.preventDefault()
        const newPrivateMessage = {
            id: new Date().toISOString(), 
            create_at: new Date().toISOString(), 
            user: userID,
            author: userID,
            privateRoom: ID,
            text: replyPrivateMessage
            }        

        try {

            wss.send(JSON.stringify(newPrivateMessage)) //send data to the server
        }catch (error) {
            console.log(error) // catch error
        }
    }


    function addUserChange(usersArray, value){

        console.log('CHECK',  [...usersArray, toNumber(value)].length)
        if ([...usersArray, toNumber(value)].length < 10) {
            const rez = getMultyUsersRoomNameFromIndexesService([...usersArray, toNumber(value), get(filter(usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'id'])])
            
            const [newRoomName, newRoomMembers] = rez
            console.log('newRoomName', newRoomName, ID)
            console.log('newRoomMembers', newRoomMembers)

            let newRoomMembersArray = new Array;
            newRoomMembers.map(user =>{
                newRoomMembersArray.push(user)
            })  

            
            const payload = {
                "privateChatName": newRoomName,
                "privateRoomMembers": newRoomMembersArray
            }
            const url = '/privaterooms'
           putToBase(payload, url, ID)


        } else {
            window.alert('Вы превысили максимальное значение пользователей в комнате. Максимальное количество 10 человек')
        }
        console.log('roomName', roomName)
    }

    function removeUserChange(userToRemoveId){
        console.log('111111111', userToRemoveId)
        const groupMembers = getIndexesFromMultyUsersRoomNameService(roomName, ID)
        const newRoomMembers = without(groupMembers, userToRemoveId)
        const newRoomName = getMultyUsersRoomNameFromIndexesService(newRoomMembers)
        let newRoomMembersArray = new Array;
        newRoomMembers.map(user =>{
            newRoomMembersArray.push(user)
        })   


        const payload = {
            "privateChatName": newRoomName[0],
            "privateRoomMembers": newRoomMembersArray
        }
        const url = '/privaterooms'
        putToBase(payload, url, ID)

    }
        useEffect(()=>{
            console.log('GroupChange result', putToBaseResult)
            if (putToBaseResult === 200){
               // window.location.reload();
            }
        },[putToBaseResult])

    return (
        <>

        <MyModalChat
            visible={modal}
            setVisible={setModal}
            >

            {sortBy(filter(messages, {'privateRoom':ID}),['create_at']).map(message=>
                <MyModalChatContainer
                    key={message.id}
                    user={user}
                    roomMessage={message}
                    create_at={message.create_at}
                    roomID={ID}
                    usersDict={usersDict}
                    avatar={get(filter(usersDict, {'username': user}),[0, 'avatar'])}
                    author={message.author}
                    privateMessageDelete={privateMessageDelete}
                    privateMessageEdit={privateMessageEdit}
                    replyPrivateWithQuotation={replyPrivateWithQuotation}
                    

                />
            )}

                <CommentInput
                    value={replyPrivateMessage}
                    onChange={e => setReplyPrivate(e.target.value)}
                    onClick={e => ReplyPrivateTransition(e)}
                    isMultipyChat={true}
                    addUserChange={addUserChange}
                    removeUserChange={removeUserChange}
                    groupMembers={groupMembers}
                    notGroupMembers={notGroupMembers}
                    usersArray={usersArray}
                />
        </MyModalChat>



        <div
            onClick={e => startChat(ID)} 
            className={cl.Container}>
            <span
                className={cl.MultyChatName}
                >Групповой чат</span>
            <div className={cl.userInfo}>
                {map(usersArray, chatMember =>
                    <div 
                        key={chatMember}
                        className={cl.userInfoCell} 
                    >
                        {get(filter(usersDict, {'author': chatMember}), ['0', 'avatar']) 
                                ? <span> <img src={get(filter(usersDict, {'author': chatMember}), ['0', 'avatar']) } alt='avatar'/></span>
                                : <span> <img src='http://127.0.0.1:8000/media/avatar/default.jpg' alt='avatar'/></span>
                            }
                    </div>
                )}
            </div>
            <div className={cl.textInfo}>
                <div className={cl.cuttedText}>
                </div>
                <div 
                onClick={startChat}>
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

export default MultiChatCover
