import React, { useEffect, useState, useMemo } from 'react'
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


function PrivateMessageContainer({
    privateMessageEdit,
    privateMessageDelete, 
    setQuotation, 
    setReplyPrivate, 
    replyPrivateMessage, 
    replyPrivate, 
    privateReply, 
    usersDict, 
    user, 
    text, 
    avatar, 
    newMessages, 
    messages, 
    userForNewChat,
    ID, 
    target,
    setPrivateModal,
    privateModal,
    ...props}) {

    const [modal, setModal] = useState(false)
    const [replyPrivateWithQuotation, setReplyPrivateWithQuotation] = useState(true)
    const [privateMessage, setPrivateMessage] = useState('')
    const [newRoomName, setNewRoomName] = useState()
    

    const callModal = useMemo(()=>{
        return userForNewChat
    },[userForNewChat])


    useEffect(()=>{
        
        /// HERE
        console.log('te')
        callModalForPrivate(callModal)  
    }, [callModal])

 
    // function callModalForPrivate(user){

    //     if (user){
    //         props.getPrivateRooms(user)
    //     }


    // } 




    



    function callModalForPrivate(user) {
      //  console.log('user', user)
      //  console.log('props.usersPrivateRooms', props.usersPrivateRooms)
      //  console.log('target', target)
        
        if (user && props.usersPrivateRooms && target){
            const addressatUser = user.id
            const currentUser = get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id'])
            const roomName = getPrivateRoomNameFromIndexesService(user.id, get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']) )
    
            //проверяем. Если есть такой чат или нет. Да тру - вариант нового чата.
          //  console.log('user.id', user)
            console.log('PIZDEC!', privateModal)
            setPrivateModal(true)
            setNewRoomName(roomName)

        }
    }
    

    // при нажатии кнопки отправить - в танку кидаем имя комнаты. Сообщение и и имя юзера кто пишет
    function SendPrivateMessage(e){
        e.preventDefault();
        if (props.usersPrivateRooms && newRoomName){
            if (!Boolean(props.usersPrivateRooms.filter(room => room.privateChatName === newRoomName).length)){
                  props.postPrivateRoom(newRoomName, privateMessage, get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']))
              }
              else{
                props.postPrivateMessage(get(props.usersPrivateRooms.filter(room => room.privateChatName === newRoomName),[0,'id']), 
                newRoomName, 
                privateMessage,
                get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']))
                  //вот сюда сделать танку и апи писать в чат newRoomName сообщение privateMessage
              }
        }
    }

    //слушаем обновление стора. если из редюсера пришел статус 201 - значит ок. Мы записали личку в новую компану. соотвествеено если это так то мы обновляем страницу. :)
    useEffect(()=>{
        setPrivateModal(false)
        if (props.newMessageSucces === 201) {
            window.location.reload();
        }
    },[props.newMessageSucces])

    useEffect(()=>{
        setPrivateModal(false)
        if (props.privateMessageSucces === 201) {
            window.location.reload();
        }
    },[props.privateMessageSucces])



    function startChat(id){
        console.log('teeest')
        setModal(true)

        const message = {
            "lastOpenDate": new Date().toISOString() 
        }

        const url = '/privaterooms'
        
        props.putToBase(message, url, id)
            console.log('TODO ОБНОВЛЯЕМ ДАТУ ЗАХОДА В КОМНАТУ')
    }



    function ReplyPrivateTransition(e){
        e.preventDefault();
        privateReply(ID) 
    }

    function ReplyPrivateTransitionWithQuotation(e){
        e.preventDefault();
        replyPrivate(user, text, date, userReply) 
    }

 
    
    

    return (
        <>
         {/* блока приватных сообщений КОТОРЫХ НЕ БЫЛО! */}
        <MyModal
            visible={privateModal}
            setVisible={setPrivateModal}
        >

            <CommentInput
                value={privateMessage}
                onChange={e => setPrivateMessage(e.target.value)}
                onClick={e => SendPrivateMessage(e)}

                // onClickCancel={setModal(false)}
            />
        </MyModal>

{/* 
            {userForNewChat
            ?   <div>

                <MyPrivateWhispModule 
                userForNewChat={userForNewChat}
                usersDict={props.usersDict}
                usersPrivateRooms={props.usersPrivateRooms}
                />  
                {console.log('aaaaaaaaa')}     
                </div>
            :   <span></span>
            } */}







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
            // onClickCancel={setModal(false)}
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



export default connect(
    //mapStateToProps
    state => ({
        usersDict: getUsersDict(state),
        userRoom: getUserRoom(state),
        newMessageSucces: state.postUserRoom,
        privateMessageSucces: state.postUserPrivate,
        putToBaseResult: getPutToBaseResult(state),
        usersPrivateRooms: getPrivateRooms(state),
    }),
    //mapDispatchToProps
    dispatch => ({
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        },
        postPrivateRoom: (value, text, userID) => {
            dispatch(postRoomAPI(value, text, userID))
        },
        postPrivateMessage: (roomID, roomName, message, userID) => {
            dispatch(postMessageAPI(roomID, roomName, message, userID))
        },
        putToBase: (value, id, url) => {
            dispatch(putToBaseAPI(value, id, url))
        },
        getPrivateRooms: (value) => {
            dispatch(getPrivateRoomsAPI(value))
        },
    })
    
)(PrivateMessageContainer)