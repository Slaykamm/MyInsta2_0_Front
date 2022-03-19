import React from 'react'
import Header from '../header/Header'
import Menu from '../../../modules/Menu/Menu'
import cl from './PrivateMessagePage.module.css'
import Footer from '../footer/Footer'
import { useState, useEffect } from 'react'
import PrivateMessageContainer from './PrivateMessageContainer/PrivateMessageContainer'
import { connect } from 'react-redux'
import { get, filter } from 'lodash'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { getUsersDict} from  '../../../redux/Selectors/baseSelectors'
import { getPrivateRoomsAPI } from '../../../API/getPrivateRoomsAPI'
import { getPrivateMessagesAPI } from '../../../API/getPrivateMessagesAPI'
// import { useSelector } from 'react-redux'
import { getPrivateRooms, getAnotherChatMatesID, getPrivateMessages } from '../../../redux/Selectors/privateRoomsSelector'

import { sortBy, last } from 'lodash'
// import { store } from '../../../redux/reducers'

    // const userToken = useSelector(getUserToken(store.getState()))
    //     console.log('userToken', userToken)

function PrivateMessagePage(props) {
    
    const [usersDict, setUsersDict] = useState([])
    const [userID, setUserID] = useState()

    useEffect(()=>{
        props.getUsersDict()

    },[])

    useEffect(()=>{
        setUsersDict(props.usersDict)
        setUserID(get(filter(props.usersDict, {'username':localStorage.getItem('SLNUserName')}),[0, 'id']))
    },[props.usersDict])


    useEffect(()=>{
        if (userID){
            props.getPrivateRooms(userID)
        }
    },[userID])



    /// TODO Ниже сделать селектором для вывода сообщения

    useEffect(()=>{
        props.getPrivateMessages(1)
    }, [props.usersDict])

        console.log('privateMessages', props.privateMessages)
        const testt = sortBy(props.privateMessages, ['create_at'])
        console.log('sorted', get(last(testt),['text']))


 

    //TODO сделать что если не 200 статус то редирект куда нить на логин.
    //TODO написать сервис по рашифровке "@PRIVATE_1_3" на юзеров, где splin через _ в массив. отрезаем 2 и 3 значение slice. Сортируем его. Берем не юзера. 
    //Делаем объект где будет собеседник. сообщения. Времена создания.
    //заодно уж закодировщик в обратную сторону сделать, чтобы готовил обратно  такую строчку.
     

    //TODO тут реализовать поиск юзеров по 


    return (
        <>
        <Header/>
        <Menu/>
        <div>
            <div className={cl.BaseLayer}>
                <div className={cl.BaseLine}>

                    <div className={cl.MessagesLayer}>


                        <div>
                            <p>Добрый день  Юзер</p>
                        </div>


                        <div className={cl.MessagesContainer}>
                             {props.anotherChatMatesList && usersDict
                            ?   props.anotherChatMatesList.map(messageRoom =>
                                    <PrivateMessageContainer 
                                        user={filter(usersDict, {'id':messageRoom.anotherChatMate})[0].username}
                                        text={get(last(testt),['text'])}
                                        avatar={filter(usersDict, {'id':messageRoom.anotherChatMate})[0].avatar}
                                        key={messageRoom.privateChatID}
                                    />
                                    )
                            : <p></p>


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
        }
    })

)(PrivateMessagePage)