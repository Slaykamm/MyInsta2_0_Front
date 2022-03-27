import React, { useEffect, useState } from 'react'
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
    ...props}) {

    const [modal, setModal] = useState(false)
     // TODO заглушка чтобы убрать цитирование
    const [replyPrivateWithQuotation, setReplyPrivateWithQuotation] = useState(true)
    const [privateModal, setPrivateModal] = useState(false)
    const [privateMessage, setPrivateMessage] = useState('')
    const [newRoomName, setNewRoomName] = useState()

    useEffect(()=>{
        callModalForPrivate(userForNewChat)  
    }, [userForNewChat])

    function callModalForPrivate(user) {
        if (user && props.usersPrivateRooms){
            const addressatUser = user.id
            const currentUser = get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id'])
            const roomName = getPrivateRoomNameFromIndexesService(user.id, get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']) )
  
    
            //проверяем. Если есть такой чат или нет. Да тру - вариант нового чата.
          //  if (!Boolean(props.usersPrivateRooms.filter(room => room.privateChatName === roomName).length)){
            setPrivateModal(true)
            console.log('личное сообщение в новый чат', roomName)

            setNewRoomName(roomName)
                
                //    console.log(roomName)
            //}
            //else{
             //   console.log('есть такой чат!')
            //    setPrivateModal(true)
                //вот тут отправиляем сообщение. Пишем в в базу постом. для этого окрываем тоже окно
          //  }
        }
    }
    

    // при нажатии кнопки отправить - в танку кидаем имя комнаты. Сообщение и и имя юзера кто пишет
    function SendPrivateMessage(e){
        e.preventDefault();
        if (props.usersPrivateRooms && newRoomName){
            if (!Boolean(props.usersPrivateRooms.filter(room => room.privateChatName === newRoomName).length)){
                //  props.postPrivateRoom(newRoomName, privateMessage, get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']))
                  console.log('NEW')
              }
      
              else{
                  console.log('есть такой чат!2222222222', newRoomName, privateMessage) 
                  //вот сюда сделать танку и апи писать в чат newRoomName сообщение privateMessage
              }
        }
  
    }

    //слушаем обновление стора. если из редюсера пришел статус 201 - значит ок. Мы записали личку в новую компану. соотвествеено если это так то мы обновляем страницу. :)
    useEffect(()=>{
        setPrivateModal(false)
        if (props.newMessageSucce === 201) {
            window.location.reload();
        }
    },[props.newMessageSucces])



    function startChat(){
        setModal(true)
        console.log("test")
        //
        //console.log('TODO ОБНОВЛЯЕМ ДАТУ ЗАХОДА В КОМНАТУ')
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
            onClick={startChat} 
            className={cl.Container}>

            <div className={cl.userInfo}>
                <img src={avatar}/>
            </div>

            <div className={cl.textInfo}>
                <div>
                    Пользователь: {user}
                </div>
                <div className={cl.cuttedText}>
                    {text
                    ? <span>Непрочитанное: {text}</span>
                    : <span>нет</span>
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
        
        

    }),
    //mapDispatchToProps
    dispatch => ({
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        },
        postPrivateRoom: (value, text, userID) => {
            dispatch(postRoomAPI(value, text, userID))
        }
    })

)(PrivateMessageContainer)