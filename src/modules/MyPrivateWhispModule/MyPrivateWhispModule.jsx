import React from 'react'
import {useEffect, useState} from 'react'
import CommentInput from '../../components/pages/commentOutput/CommentInput/CommentInput'
import MyModal from '../../UI/MyModal/MyModal'
import { 
    get, 
    filter, 
    pick 
} from 'lodash'
import { getPrivateRoomNameFromIndexesService } from '../../services/roomNamesService'
import { connect } from 'react-redux'

import { postRoomAPI } from '../../API/postPrivateRoomAPI'
import { postMessageAPI } from '../../API/postPrivateMessage'
import { getUserRoom } from '../../redux/Selectors/baseSelectors'
import { getPrivateRooms } from '../../redux/Selectors/privateRoomsSelector'
import { getPrivateRoomsAPI} from '../../API/getPrivateRoomsAPI'



function MyPrivateWhispModule(
    {
        userForNewChat,
        usersDict,
        usersPrivateRooms,
        setUserForNewChat,
        setUserPrivateRooms,
        ...props
    }) {

    const [privateModal, setPrivateModal] = useState(false)
    const [privateMessage, setPrivateMessage] = useState('')
    const [newRoomName, setNewRoomName] = useState()
    const [userID, setUserID] = useState()
    const [listUsers, setListUsers] = useState()



    //при маунте модуля подгружаем словари иполучилаем список юзеров и ай ди юзера
    useEffect(()=>{

        if (usersDict){
            setUserID(get(filter(usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'id']))
            setListUsers(usersDict.map(user => pick(user, ['id', 'username'])))
            console.log('check1', usersDict.map(user => pick(user, ['id', 'username'])))
            
        }
        
    },[usersDict])


        //получаем юзера с которому будем писать сообщение и высываем модальный чат.
        console.log('check!', listUsers)

        useEffect(()=>{
            const user = filter(listUsers, {'id':userForNewChat})
            callModalForPrivate(get(user,[0]))
        }, [listUsers])
        
        

        // если у нас есть мы (карент юзер) и список всех чатов карент юзера
        function callModalForPrivate(user) {
            
            //если они есть то из айдишников сарент юзера и адресата получаем имя комнаты.
            
            console.log('111111111111111111222222222222222222', user, usersPrivateRooms)
            if (user && usersPrivateRooms){
                console.log('1', user, '2', usersPrivateRooms)

                const addressatUser = user.id
                const currentUser = get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id'])
                const roomName = getPrivateRoomNameFromIndexesService(user.id, get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']) )
        
                if (addressatUser === currentUser) {
                    return window.alert('Нельзя отправлять сообщения себе!')
                }

                //проверяем. Если есть такой чат или нет. Да тру - вариант нового чата.
                setPrivateModal(true)
                setNewRoomName(roomName)

            }
        }

        
        // при нажатии кнопки отправить - в танку кидаем имя комнаты. Сообщение и и имя юзера кто пишет
        function SendPrivateMessage(e){
            e.preventDefault();
            if (usersPrivateRooms && newRoomName){
                if (!Boolean(usersPrivateRooms.filter(room => room.privateChatName === newRoomName).length)){
                    props.postPrivateRoom(newRoomName, privateMessage, get(filter(usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']))
                
                }
                else{
                    props.postPrivateMessage(get(usersPrivateRooms.filter(room => room.privateChatName === newRoomName),[0,'id']), 
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
               setUserForNewChat()
               setUserPrivateRooms()
               setListUsers()
            }
        },[props.newMessageSucces])

        useEffect(()=>{
            setPrivateModal(false)
            if (props.privateMessageSucces === 201) {
               window.location.reload();
               setUserForNewChat('')
               setUserPrivateRooms('')
               setListUsers('')
            }
        },[props.privateMessageSucces])



    
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
        
        </>
    )
}



export default connect(
    //mapStateToProps
    state => ({
        userRoom: getUserRoom(state),
        newMessageSucces: state.postUserRoom,
        privateMessageSucces: state.postUserPrivate,
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
        getPrivateRooms: (value) => {
            dispatch(getPrivateRoomsAPI(value))
        },
    })
    
)(MyPrivateWhispModule)