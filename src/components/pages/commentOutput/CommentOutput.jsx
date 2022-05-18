import React, { useRef } from 'react'
import { useState } from 'react'
import cl from './СommentOutput.module.css'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCommentsThunkAPI } from '../../../API/getCommentsAPI'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { filter, get, toNumber} from 'lodash'
import Comment from './comment/Comment'
import { useNavigate } from 'react-router-dom'
import CommentInput from './CommentInput/CommentInput';
import { convertedFullDate } from '../../../services/dataConverter';
import { 
    getComments, 
    getUserToken, 
    getAllCommentsSelectedbyVideo, 
    getDeleteFromBaseResult, 
    getPutToBaseResult, 
    getPostToBaseResult, 
    getCommentsWithQuotationsResult, 
    getPostCommentsWithQuotationsResult 
} from '../../../redux/Selectors/baseSelectors' 
import { getPrivateRoomNameFromIndexesService, getIndexesFromPrivateRoomNameService} from '../../../services/roomNamesService'
import MyModal from '../../../UI/MyModal/MyModal';
import { getPrivateRoomsAPI } from '../../../API/getPrivateRoomsAPI'
import { getUsersDict, getUserRoom} from  '../../../redux/Selectors/baseSelectors'
import { getPrivateRooms, getAnotherChatMatesID, getPrivateMessages } from '../../../redux/Selectors/privateRoomsSelector'
import { postRoomAPI } from '../../../API/postPrivateRoomAPI'
import { postMessageAPI } from '../../../API/postPrivateMessage'
import { putToBaseAPI } from '../../../API/putToBaseAPI'
import { deleteFromBaseAPI } from '../../../API/deleteFromBaseAPI'
import { postToBaseAPI } from '../../../API/postToBaseAPI';
import { getCommentsWithQuotationAPI } from '../../../API/getCommentsWithQuotationAPI';
import { postCommentsWithQuotationAPI } from '../../../API/postCommentsWithQuotationAPI'



function _CommentOutput({videoID, ...props}) {
    const [userName, setUserName] = useState('')
    const [comments, setComments] = useState([])
    const [replyComment, setReplyComment] = useState('')
    const [commentQuote, setCommentQuote] = useState({})
    const [editedComment, setEditedComment] = useState({})


    const navigate = useNavigate()

    //console.log('CommentOutput rendered 6 times ')

    //TODO сделать рефактор. передавать словарь в пропсах
    useEffect(()=>{ 
        props.getCommentsAPI(videoID, localStorage.getItem('SLNToken')),
        props.getUsersDict()
        props.getCommentsWithQuotations(videoID)   // <- будущие комменты TODO
    },[localStorage.getItem('SLNToken')])

    



    //обрабатываем ошибку авториации)
    useEffect(()=>{
        if (get(props.commentsWithQuotationsResult, [0, 'status']) == 401) {
            //navigate("/login")
            setComments()  
        }
        else {
            //setComments(get(props.comments, [0, 'data']))
            setComments(props.commentsWithQuotationsResult)
        }
    },[props.commentsWithQuotationsResult])

    // получаем имя из ЛокалСторажд
    useEffect(()=>{
        setUserName(localStorage.getItem('SLNUserName'))
       
    },[])


    //видимо тут должен быть POST на сервер. TODO thunk POST  ++//////////////////////////////////////////////////////////////////////

    function commentReply(user, text, date, userReply){

        const urlComment = '/comments'
        const message =    {
            "text":userReply,
            "rating": 0,
            "create_at": new Date().toISOString(),
            "author": filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id,
            "video": toNumber(videoID)
        }
        
        const urlQuotation = '/quotations'
        const quotation = {
            "text": text,
            "create_at": date,
            "baseComment": null,
            "author": filter(props.usersDict, {'username': user})[0].id,
            "video": toNumber(videoID)
        }
        props.postCommentsWithQuotations(urlComment, message, urlQuotation, quotation)


            const quote = {
                author: get(filter(props.usersDict, {'username': user}),[0,'id']),
                text: text,
                create_at: date,
            }
            let additionWithCommentPost = {
                        id: new Date().toISOString(), 
                        create_at: new Date().toISOString(), 
                        author:  filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id, 
                        quote: quote,
                        text: userReply
                    }
            setComments([ ...comments, additionWithCommentPost])
            setReplyComment('')  
        
    }

//после возврата из селектора id нового поста - добавляем в чат то, что ранее добавили в базу.



    // ++ простой коммент----------------------------------------
    function printComment(e){
        e.preventDefault();

        const message =    {
            "text":replyComment,
            "rating": 0,
            "create_at": new Date().toISOString(),
            "author": filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id,
            "video": videoID
        }
        const url = '/comments'
        props.postToBase(message, url)
    }
    
    useEffect(()=>{
        if (props.postToBaseResult.id){
            PrintToChat();
        }
    },[props.postToBaseResult])


    function PrintToChat() {
        let additionPost = {
            id: props.postToBaseResult.id, 
            create_at: new Date().toISOString(), 
            author:  filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id, 
            text: replyComment
        }
        setComments([ ...comments, additionPost]) 
        setReplyComment('') 

    }





    //EDIT ++
    function commentEdit(id, user, text, date){
        const editedComments = filter(comments, {id:id})
        editedComments[0].text = text
        setEditedComment(editedComments)

        const message = {
            "text": text 
        }
        const url = '/comments'
        props.putToBase(message, url, id)
    }



    // DELETE COMMENT  ++
    function commentDelete(id){
        const newComments = comments.filter(com => com.id !== id)
        setComments(comments.filter(com => com.id !== id))


        const url = '/comments'
        props.deleteFromBase(id, url)
        }

 
    //PRIVATE --
    const [privateModal, setPrivateModal] = useState(false)
    const [privateMessage, setPrivateMessage] = useState('')
    const [newRoomName, setNewRoomName] = useState()
    const [user, setUser] = useState({})
    const [target, setTarget] = useState('')  // эти типо ключа чтобы срабатывала нужна модалка. иначе тригеряться все по фазе всплытия

    function commentPrivateMessege(id, user){
        //console.log("111", id.target )
        setTarget(id.target)
        //получаем оба айди
        //console.log('тот кому пишем ', get(filter(props.usersDict, {'username': user}),[0,'id']))
        //console.log('МЫ ', get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']))


        setUser({
            id:  get(filter(props.usersDict, {'username': user}),[0,'id']),
            username:  get(filter(props.usersDict, {'username': user}),[0,'username']),
            roomName: getPrivateRoomNameFromIndexesService(get(filter(props.usersDict, {'username': user}),[0,'id']), get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']) )
        })
        
        //отправляем в сервис комнат (правило: оба айти отсортированы по возрастанию и далее название формата "@PRIVATE_АЙДИ1_АЙДИ2")
        const roomName = getPrivateRoomNameFromIndexesService(get(filter(props.usersDict, {'username': user}),[0,'id']), get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']) )
        //получаем название комнаты
        //пишшем в комнату, если нет создаем ее и пишем
    }

    //отправка приватных сообщений TODO REFACTOR THIs!!!!!!

    useEffect(()=>{
        if (user.id){
            props.getPrivateRooms(user.id)

        }        
    },[user])
    

    useEffect(()=>{
            callModalForPrivate2(user)
              
            //console.log('Hello World!')
     }, [props.usersPrivateRooms])




    function callModalForPrivate2(user) {

        
        if (props.usersPrivateRooms.length && user && target ){
            const addressatUser = user.id
            const currentUser = get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id'])
            const roomName = user.roomName
    
             //проверяем. Если есть такой чат или нет. Да тру - вариант нового чата.
            setPrivateModal(true)
            setNewRoomName(roomName)
         }
     }
    

     // при нажатии кнопки отправить - в танку кидаем имя комнаты. Сообщение и и имя юзера кто пишет
    function SendPrivateMessage(e){
        e.preventDefault();
        if (props.usersPrivateRooms && newRoomName){
            if (!Boolean(props.usersPrivateRooms.filter(room => room.privateChatName === newRoomName).length)){
                  props.postPrivateRoom(newRoomName, privateMessage, get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']))
              }
              else{
                props.postPrivateMessage(get(props.usersPrivateRooms.filter(room => room.privateChatName === newRoomName),[0,'id']), 
                newRoomName, 
                privateMessage,
                get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']))
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

// ------------------till here!!!

    return (
        <div 
            className={cl.BaseLine}
            >

         {/* блока приватных сообщений КОТОРЫХ НЕ БЫЛО! */}

        { privateModal &&
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
        }
         



            

            {comments && props.usersDict.length && userName
                    ?   <div>
                            <h2 style={{color:'grey'}}>Ваши комментарии</h2>
                            {comments.map(
                                comment => <Comment 
                                                key={comment.id} 
                                                date={comment.create_at} 
                                                user={filter(props.usersDict, {'id': comment.author})[0].username} 
                                                avatar={filter(props.usersDict, {'id': comment.author})[0].avatar} 
                                                text={comment.text}
                                                id={comment.id}
                                                usersDict={props.usersDict}
                                                comment = {comment}
                                                commentReply={commentReply}
                                                commentPrivateMessege={commentPrivateMessege}
                                                commentEdit={commentEdit}
                                                commentDelete={commentDelete}

                                            />
                            )}
                        </div>
                    : <h3>Пока нет комментариев к данному видео</h3>
            }

            <hr/>


            {/* <CommentReduxForm 
            onSubmit={addComment}/> */}
            
            <CommentInput

                value={replyComment}
                onChange={e => setReplyComment(e.target.value)}
                onClick={printComment}
                
                />
        </div>

    )
}

const CommentOutput = React.memo(_CommentOutput)

export default connect(
    //mapStateToProps
    state => ({
        comments: getAllCommentsSelectedbyVideo(state),
        usersDict: getUsersDict(state),
        userToken: getUserToken(state),
        usersPrivateRooms: getPrivateRooms(state),
        newMessageSucces: state.postUserRoom,
        privateMessageSucces: state.postUserPrivate,
        putToBaseResult: getPutToBaseResult(state),
        deleteToBaseResult: getDeleteFromBaseResult(state),
        postToBaseResult: getPostToBaseResult(state),
        commentsWithQuotationsResult: getCommentsWithQuotationsResult(state),
        postCommentsWithQuotationsResult: getPostCommentsWithQuotationsResult(state)
    }),
    //mapDispatchToProps
    dispatch => ({
        getCommentsAPI: (videoID, userToken) => {
            dispatch(getCommentsThunkAPI(videoID, userToken))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        },
        getPrivateRooms: (value) => {
            dispatch(getPrivateRoomsAPI(value))
        },
        postPrivateRoom: (value, text, userID) => {
            dispatch(postRoomAPI(value, text, userID))
        },
        postPrivateMessage: (roomID, roomName, message, userID) => {
            dispatch(postMessageAPI(roomID, roomName, message, userID))
        },
        putToBase: (value, url, id) => {
            dispatch(putToBaseAPI(value, url, id))
        },
        deleteFromBase: (id, url) => {
            dispatch(deleteFromBaseAPI(id, url))
        },
        postToBase: (id, url) => {
            dispatch(postToBaseAPI(id, url))
        },
        getCommentsWithQuotations: (id) => {
            dispatch(getCommentsWithQuotationAPI(id))
        },
        postCommentsWithQuotations: (urlComment, baseMessage, urlQuot, quotMessage) => {
            dispatch(postCommentsWithQuotationAPI(urlComment, baseMessage, urlQuot, quotMessage))
        }
    })

)(CommentOutput)

