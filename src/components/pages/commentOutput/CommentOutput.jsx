import React, { useRef } from 'react'
import { useState } from 'react'
import cl from './–°ommentOutput.module.css'
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

    //TODO —Ā–ī–Ķ–Ľ–į—ā—Ć —Ä–Ķ—Ą–į–ļ—ā–ĺ—Ä. –Ņ–Ķ—Ä–Ķ–ī–į–≤–į—ā—Ć —Ā–Ľ–ĺ–≤–į—Ä—Ć –≤ –Ņ—Ä–ĺ–Ņ—Ā–į—Ö
    useEffect(()=>{ 
        props.getCommentsAPI(videoID, localStorage.getItem('SLNToken')),
        props.getUsersDict()
        props.getCommentsWithQuotations(videoID)   // <- –Ī—É–ī—É—Č–ł–Ķ –ļ–ĺ–ľ–ľ–Ķ–Ĺ—ā—č TODO
    },[localStorage.getItem('SLNToken')])

    



    //–ĺ–Ī—Ä–į–Ī–į—ā—č–≤–į–Ķ–ľ –ĺ—ą–ł–Ī–ļ—É –į–≤—ā–ĺ—Ä–ł–į—Ü–ł–ł)
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

    // –Ņ–ĺ–Ľ—É—á–į–Ķ–ľ –ł–ľ—Ź –ł–∑ –õ–ĺ–ļ–į–Ľ–°—ā–ĺ—Ä–į–∂–ī
    useEffect(()=>{
        setUserName(localStorage.getItem('SLNUserName'))
       
    },[])


    //–≤–ł–ī–ł–ľ–ĺ —ā—É—ā –ī–ĺ–Ľ–∂–Ķ–Ĺ –Ī—č—ā—Ć POST –Ĺ–į —Ā–Ķ—Ä–≤–Ķ—Ä. TODO thunk POST  ++//////////////////////////////////////////////////////////////////////

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

//–Ņ–ĺ—Ā–Ľ–Ķ –≤–ĺ–∑–≤—Ä–į—ā–į –ł–∑ —Ā–Ķ–Ľ–Ķ–ļ—ā–ĺ—Ä–į id –Ĺ–ĺ–≤–ĺ–≥–ĺ –Ņ–ĺ—Ā—ā–į - –ī–ĺ–Ī–į–≤–Ľ—Ź–Ķ–ľ –≤ —á–į—ā —ā–ĺ, —á—ā–ĺ —Ä–į–Ĺ–Ķ–Ķ –ī–ĺ–Ī–į–≤–ł–Ľ–ł –≤ –Ī–į–∑—É.



    // ++ –Ņ—Ä–ĺ—Ā—ā–ĺ–Ļ –ļ–ĺ–ľ–ľ–Ķ–Ĺ—ā----------------------------------------
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
    const [target, setTarget] = useState('')  // —ć—ā–ł —ā–ł–Ņ–ĺ –ļ–Ľ—é—á–į —á—ā–ĺ–Ī—č —Ā—Ä–į–Ī–į—ā—č–≤–į–Ľ–į –Ĺ—É–∂–Ĺ–į –ľ–ĺ–ī–į–Ľ–ļ–į. –ł–Ĺ–į—á–Ķ —ā—Ä–ł–≥–Ķ—Ä—Ź—ā—Ć—Ā—Ź –≤—Ā–Ķ –Ņ–ĺ —Ą–į–∑–Ķ –≤—Ā–Ņ–Ľ—č—ā–ł—Ź

    function commentPrivateMessege(id, user){
        //console.log("111", id.target )
        setTarget(id.target)
        //–Ņ–ĺ–Ľ—É—á–į–Ķ–ľ –ĺ–Ī–į –į–Ļ–ī–ł
        //console.log('—ā–ĺ—ā –ļ–ĺ–ľ—É –Ņ–ł—ą–Ķ–ľ ', get(filter(props.usersDict, {'username': user}),[0,'id']))
        //console.log('–ú–ę ', get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']))


        setUser({
            id:  get(filter(props.usersDict, {'username': user}),[0,'id']),
            username:  get(filter(props.usersDict, {'username': user}),[0,'username']),
            roomName: getPrivateRoomNameFromIndexesService(get(filter(props.usersDict, {'username': user}),[0,'id']), get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']) )
        })
        
        //–ĺ—ā–Ņ—Ä–į–≤–Ľ—Ź–Ķ–ľ –≤ —Ā–Ķ—Ä–≤–ł—Ā –ļ–ĺ–ľ–Ĺ–į—ā (–Ņ—Ä–į–≤–ł–Ľ–ĺ: –ĺ–Ī–į –į–Ļ—ā–ł –ĺ—ā—Ā–ĺ—Ä—ā–ł—Ä–ĺ–≤–į–Ĺ—č –Ņ–ĺ –≤–ĺ–∑—Ä–į—Ā—ā–į–Ĺ–ł—é –ł –ī–į–Ľ–Ķ–Ķ –Ĺ–į–∑–≤–į–Ĺ–ł–Ķ —Ą–ĺ—Ä–ľ–į—ā–į "@PRIVATE_–ź–ô–Ē–ė1_–ź–ô–Ē–ė2")
        const roomName = getPrivateRoomNameFromIndexesService(get(filter(props.usersDict, {'username': user}),[0,'id']), get(filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')}),[0,'id']) )
        //–Ņ–ĺ–Ľ—É—á–į–Ķ–ľ –Ĺ–į–∑–≤–į–Ĺ–ł–Ķ –ļ–ĺ–ľ–Ĺ–į—ā—č
        //–Ņ–ł—ą—ą–Ķ–ľ –≤ –ļ–ĺ–ľ–Ĺ–į—ā—É, –Ķ—Ā–Ľ–ł –Ĺ–Ķ—ā —Ā–ĺ–∑–ī–į–Ķ–ľ –Ķ–Ķ –ł –Ņ–ł—ą–Ķ–ľ
    }

    //–ĺ—ā–Ņ—Ä–į–≤–ļ–į –Ņ—Ä–ł–≤–į—ā–Ĺ—č—Ö —Ā–ĺ–ĺ–Ī—Č–Ķ–Ĺ–ł–Ļ TODO REFACTOR THIs!!!!!!

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
    
             //–Ņ—Ä–ĺ–≤–Ķ—Ä—Ź–Ķ–ľ. –ē—Ā–Ľ–ł –Ķ—Ā—ā—Ć —ā–į–ļ–ĺ–Ļ —á–į—ā –ł–Ľ–ł –Ĺ–Ķ—ā. –Ē–į —ā—Ä—É - –≤–į—Ä–ł–į–Ĺ—ā –Ĺ–ĺ–≤–ĺ–≥–ĺ —á–į—ā–į.
            setPrivateModal(true)
            setNewRoomName(roomName)
         }
     }
    

     // –Ņ—Ä–ł –Ĺ–į–∂–į—ā–ł–ł –ļ–Ĺ–ĺ–Ņ–ļ–ł –ĺ—ā–Ņ—Ä–į–≤–ł—ā—Ć - –≤ —ā–į–Ĺ–ļ—É –ļ–ł–ī–į–Ķ–ľ –ł–ľ—Ź –ļ–ĺ–ľ–Ĺ–į—ā—č. –°–ĺ–ĺ–Ī—Č–Ķ–Ĺ–ł–Ķ –ł –ł –ł–ľ—Ź —é–∑–Ķ—Ä–į –ļ—ā–ĺ –Ņ–ł—ą–Ķ—ā
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
                  //–≤–ĺ—ā —Ā—é–ī–į —Ā–ī–Ķ–Ľ–į—ā—Ć —ā–į–Ĺ–ļ—É –ł –į–Ņ–ł –Ņ–ł—Ā–į—ā—Ć –≤ —á–į—ā newRoomName —Ā–ĺ–ĺ–Ī—Č–Ķ–Ĺ–ł–Ķ privateMessage
              }
        }
     }

    //—Ā–Ľ—É—ą–į–Ķ–ľ –ĺ–Ī–Ĺ–ĺ–≤–Ľ–Ķ–Ĺ–ł–Ķ —Ā—ā–ĺ—Ä–į. –Ķ—Ā–Ľ–ł –ł–∑ —Ä–Ķ–ī—é—Ā–Ķ—Ä–į –Ņ—Ä–ł—ą–Ķ–Ľ —Ā—ā–į—ā—É—Ā 201 - –∑–Ĺ–į—á–ł—ā –ĺ–ļ. –ú—č –∑–į–Ņ–ł—Ā–į–Ľ–ł –Ľ–ł—á–ļ—É –≤ –Ĺ–ĺ–≤—É—é –ļ–ĺ–ľ–Ņ–į–Ĺ—É. —Ā–ĺ–ĺ—ā–≤–Ķ—Ā—ā–≤–Ķ–Ķ–Ĺ–ĺ –Ķ—Ā–Ľ–ł —ć—ā–ĺ —ā–į–ļ —ā–ĺ –ľ—č –ĺ–Ī–Ĺ–ĺ–≤–Ľ—Ź–Ķ–ľ —Ā—ā—Ä–į–Ĺ–ł—Ü—É. :)
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

         {/* –Ī–Ľ–ĺ–ļ–į –Ņ—Ä–ł–≤–į—ā–Ĺ—č—Ö —Ā–ĺ–ĺ–Ī—Č–Ķ–Ĺ–ł–Ļ –ö–ě–Ę–ě–†–ę–• –Ě–ē –Ď–ę–õ–ě! */}

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
                            <h2 style={{color:'grey'}}>–í–į—ą–ł –ļ–ĺ–ľ–ľ–Ķ–Ĺ—ā–į—Ä–ł–ł</h2>
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
                    : <h3>–ü–ĺ–ļ–į –Ĺ–Ķ—ā –ļ–ĺ–ľ–ľ–Ķ–Ĺ—ā–į—Ä–ł–Ķ–≤ –ļ –ī–į–Ĺ–Ĺ–ĺ–ľ—É –≤–ł–ī–Ķ–ĺ</h3>
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

