import React from 'react'
import Header from '../header/Header'
import Menu from '../../../modules/Menu/Menu'
import cl from './PrivateMessagePage.module.css'
import { useState, useEffect, useMemo } from 'react'
import PrivateMessageContainer from './PrivateMessageContainer/PrivateMessageContainer'
import { connect } from 'react-redux'
import { get, filter, flatten } from 'lodash'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { getPrivateRoomsAPI } from '../../../API/getPrivateRoomsAPI'
import { getPrivateMessagesAPI } from '../../../API/getPrivateMessagesAPI'
import { postRoomAPI } from '../../../API/postPrivateRoomAPI'
import { putToBaseAPI } from '../../../API/putToBaseAPI'
import { deleteFromBaseAPI } from '../../../API/deleteFromBaseAPI'
import { getUsersDict, getUserRoom, getPutToBaseResult, getDeleteFromBaseResult} from  '../../../redux/Selectors/baseSelectors'
import { getPrivateRooms, getAnotherChatMatesID, getPrivateMessages } from '../../../redux/Selectors/privateRoomsSelector'
import { filterQuery } from '../../../services/filterQuery'
import { sortBy, last, pick } from 'lodash'

function PrivateMessagePage(props) {
    
    const [usersDict, setUsersDict] = useState([])
    const [userID, setUserID] = useState()
    const [usersPrivateMessages, setUsersPrivateMessages] = useState()
    const [replyPrivateMessage, setReplyPrivateMessage] = useState('')
    const [listUsers, setListUsers] = useState()
    const [userForNewChat, setUserForNewChat] = useState()


    useEffect(()=>{
        props.getUsersDict()

    },[])

    useEffect(()=>{
        setUsersDict(props.usersDict)
        setUserID(get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'id']))
        setListUsers(props.usersDict.map(user => pick(user, ['id', 'username'])))
    },[props.usersDict])


    useEffect(()=>{
        if (userID){
            props.getPrivateRooms(userID)
        }
    },[userID])

    
//тут мы получаем полный список сообщений, которые для юзера, деленный по комнатам.
    useEffect(()=>{
        props.getPrivateMessages(props.usersPrivateRooms)
    },[props.usersPrivateRooms])

    //передаем мессаджи юзера
    useEffect(()=>{
      setUsersPrivateMessages(flatten(props.privateMessages))  
    },[props.privateMessages])

    
    /// TODO Ниже сделать селектором для вывода сообщения


    function getLastMessage(roomID){
        const roomsMessages = flatten(props.privateMessages)
        const filteredByAuthor = filter(roomsMessages, {'privateRoom':roomID}).filter(post => post.author !== userID)
        const filterdAndSorted = sortBy(filteredByAuthor, ['create_at'])
        const roomDate = get(filter(props.usersPrivateRooms, {'id': roomID}),[0,'lastOpenDate'])
        const newDateFilter = filterdAndSorted.filter(date => {
            return date.create_at > roomDate
        })
        const lastFileteredAndSorted = get(last(filterdAndSorted),['text'])
        return lastFileteredAndSorted
    }

    function getNumberNewMessages(roomID){
        const roomsMessages = flatten(props.privateMessages)
        const filteredByAuthor = filter(roomsMessages, {'privateRoom':roomID}).filter(post => post.author !== userID)
        const filterdAndSorted = sortBy(filteredByAuthor, ['create_at'])

        const roomDate = get(filter(props.usersPrivateRooms, {'id': roomID}),[0,'lastOpenDate'])
        const newDateFilter = filterdAndSorted.filter(date => {
            return date.create_at > roomDate
        }) 
        return newDateFilter.length
    }
 

    // ф-ция отвечает за ответ юзеру 
    // TODO через websocketОтправку
//========================REPLY

    function privateReply(roomID){
        const username = localStorage.getItem('SLNUserName')
        const newPrivateMessage = {
            id: new Date().toISOString(), 
            create_at: new Date().toISOString(), 
            author: userID,
            privateRoom: roomID,
            text: replyPrivateMessage
        }
        console.log('TODO через websocketОтправку')

        setUsersPrivateMessages([...usersPrivateMessages, newPrivateMessage])
        setReplyPrivateMessage('')
    }

    //===============with QUOTATION
    function privateReplWithQoutation(user, text, date, userReply){
        const quote = {
            user: user,
            text: text,
            date: convertedFullDate(date),
        }

        let additionWithReplyPost = {
                    id: new Date().toISOString(), 
                    create_at: new Date().toISOString(), 
                    author:  filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id, 
                    quote: quote,
                    text: userReply
                }
        setUsersPrivateMessages([ ...usersPrivateMessages, additionWithReplyPost]) 
        setReplyPrivateMessage('')  
    }

//-===========================Delete++====================
    function privateMessageDelete(id){
        setUsersPrivateMessages(usersPrivateMessages.filter(message => message.id !== id))

        const url = '/prvatemessages'
        props.deleteFromBase(id, url)
        
    }

    useEffect(()=>{
        console.log('props.deleteFromBaseResult', props.deleteFromBaseResult)
    },[props.deleteFromBaseResult])



    //EDIT ++========================================
    function privateMessageEdit(id, text){
        const editedMessage = filter(usersPrivateMessages, {id:id})
        editedMessage[0].text = text

        const url = '/prvatemessages'
        const message = {
            "text": text,
        }
        props.putToBase(message, id, url)
    }

    useEffect(()=>{
        console.log('props.putToBaseResult', props.putToBaseResult)
    },[props.putToBaseResult])


        // Блок фильтрации юзеров//////////////////////////////////////////
        const [searchQuery, setSearchQuery] = useState('')
        const [filteredUsers, setFilteredUsers] = useState()
        function checkTheInput(event){
            setSearchQuery(event.target.value)
        }
        
        const filteredUsersProcess = useMemo(()=>{
            return filterQuery(listUsers, searchQuery)
        },[listUsers, searchQuery])
        

        useEffect(()=>{
            if (filteredUsersProcess){
                setFilteredUsers(filteredUsersProcess.filter(user => user.username !== localStorage.getItem('SLNUserName')))
            }
        },[filteredUsersProcess])
        

        // ВСЕ


        // пишем личные сообщения найденным юзерам



        function callModalForPrivate (user){
            setUserForNewChat(user)
            console.log('user', user)
        } 

    return (
        <>
        <Header/>
        <Menu
        value={searchQuery}
        onChange={checkTheInput}
        placeholder='Поиск пользователя для отправки сообщений'
        />

        <div>
            <div className={cl.BaseLayer}>
                <div className={cl.BaseLine}>

                    <div className={cl.MessagesLayer}>


                        <div>
                            <p>Добрый день</p>
                        </div>


                        <div className={cl.MessagesContainer}>
                             {props.anotherChatMatesList && usersDict
                            ?   props.anotherChatMatesList.map(messageRoom =>
                                    <PrivateMessageContainer 
                                        key={messageRoom.privateChatID}
                                        messages={usersPrivateMessages}
                                        ID={messageRoom.privateChatID}
                                        user={filter(usersDict, {'id':messageRoom.anotherChatMate})[0].username}
                                        avatar={filter(usersDict, {'id':messageRoom.anotherChatMate})[0].avatar}
                                        text={
                                        getLastMessage(messageRoom.privateChatID)  
                                        ? getLastMessage(messageRoom.privateChatID)
                                        : <p></p>
                                        }
                                        newMessages={getNumberNewMessages(messageRoom.privateChatID)}
                                        usersDict={props.usersDict}
                                        privateReply={privateReply}
                                        setReplyPrivate={setReplyPrivateMessage}
                                        replyPrivateMessage={replyPrivateMessage}
                                        replyPrivateQithQuotation={privateReplWithQoutation}
                                        privateMessageDelete={privateMessageDelete}
                                        privateMessageEdit={privateMessageEdit}
                                        userForNewChat={userForNewChat}
                                        usersPrivateRooms={props.usersPrivateRooms}
                                        
                                    />
                                    )
                            : <p></p>


                            } 

                        </div>
                    </div>

                    <div className={cl.userList}>
                        <div className={cl.MessagesLayer}>
                            <h5>Список пользователей, зарегистрированных на портале</h5>

                                { filteredUsers
                                ?   filteredUsers.map(user =>
                                        <span
                                            className={cl.userName}
                                            key={user.id}
                                            
                                        >
                                            <span
                                                onClick={() => callModalForPrivate(user)}
                                                value={user.username}
                                                
                                            >{user.username}, </span>
                                        </span>
                                    )
                                : <p>Ожидаем информацию по пользователям.</p>
                                }

                        </div>
                    </div>

                </div>
            </div>

        </div>
        </>
    )
}




export default connect(
    //mapStateToProps
    state => ({
        usersDict: getUsersDict(state),
        usersPrivateRooms: getPrivateRooms(state),
        anotherChatMatesList: getAnotherChatMatesID(state),
        privateMessages: getPrivateMessages(state),
        userRoom: getUserRoom(state),
        putToBaseResult: getPutToBaseResult(state),
        deleteFromBaseResult: getDeleteFromBaseResult(state)

        
        

    }),
    //mapDispatchToProps
    dispatch => ({
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        },
        getPrivateRooms: (value) => {
            dispatch(getPrivateRoomsAPI(value))
        },
        getPrivateMessages: (value) => {
            dispatch(getPrivateMessagesAPI(value))
        },
        postPrivateRoom: (value) => {
            dispatch(postRoomAPI(value))
        },
        putToBase: (value, id, url) => {
            dispatch(putToBaseAPI(value, id, url))
        },
        deleteFromBase: (id, url) => {
            dispatch(deleteFromBaseAPI(id, url))
        }
    })

)(PrivateMessagePage)