import React, { useRef } from 'react'
import { useState } from 'react'
import cl from './СommentOutput.module.css'
import { reduxForm } from 'redux-form';
import CommentForm from './commentFormRedux/CommentForm';
import { getCookies } from '../../../services/cookieWorksService';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCommentsThunkAPI } from '../../../API/getCommentsAPI'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { filter, get} from 'lodash'
import Comment from './comment/Comment'
import { useNavigate } from 'react-router-dom'
import CommentInput from './CommentInput/CommentInput';
import MyModal from '../../../UI/MyModal/MyModal';








function CommentOutput(props) {

    const [userDict, setUserDict] = useState([])
    const [userName, setUserName] = useState('')
    const [comments, setComments] = useState([])
    const [replyComment, setReplyComment] = useState('')
    const [commentQuote, setCommentQuote] = useState({})


    const navigate = useNavigate()


    //TODO сделать рефактор. передавать словарь в пропсах
    useEffect(()=>{ 
        props.getCommentsAPI(props.videoID, localStorage.getItem('SLNToken')),
        props.getUsersDict()
    },[localStorage.getItem('SLNToken')])

 

    //обрабатываем ошибку авториации)
    useEffect(()=>{
        if (get(props.comments, [0, 'status']) == 401) {
            console.log("FROM COMMENTS", get(props.comments, [0, 'status']))
            //navigate("/login")
            setComments()  
        }
        else {
            setComments(get(props.comments, [0, 'data']))

            
        }
    },[props.comments])

    // получаем имя из ЛокалСторажд
    useEffect(()=>{
        setUserName(localStorage.getItem('SLNUserName'))
       
    },[])



    //видимо тут должен быть POST на сервер. TODO thunk POST 

    
    function commentReply(user, text, date, userReply){

        
  

        const quote = {
            user: user,
            text: text,
            date: date,
        }


        let additionWithCommentPost = {
                    id: new Date().toISOString(), 
                    create_at: new Date().toISOString(), 
                    author:  filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id, 
                    quote: quote,
                    text: userReply
                }
        setComments([ ...comments, additionWithCommentPost]) 
        console.log('COMMENTS', comments)
        setReplyComment('')  


        // тут попытка реализовать следующую логику: при нажатии на reply
        // сюда приходит id коммента который мы хотим отквотить.
        // далее по этому комменту мы получаем автора и текст.
        // Вся сложность этого метода том, что в THUNK надо инжектировать квоты к комментам, следующим образом:
        // есть еще одна одна сущность с 2мя полями 
        //  1 - base comment - это id того, в который мы будет комментить. 
        //  2 - quotedCommentID - это тот, который мы будет комментить 

        // далее мы это все передаем в компонент для рендера. 



        // console.log('commentReply with comment ID', id)
        // //фильтурем сомменты по айди. получаем оттуда имя автора того. Дату и текст. Это все обрамляем  
        // setCommentQuote(get(filter(comments, {'id':id}),[0,'text']))

        //идея есть коммента есть комента юзера. Это все проверяем и рендирим в один коммента и это будет одним компонентом, Просто надо разбить на 2 части.
       // в этом случае у нас будет только 1 квот. да и срать по сути.

       //в итоге догадался добавлять в объект ответ свойство цитата. так просто...


    }



    function printComment(e){
        e.preventDefault();

        console.log('commentQuote', commentQuote)

        let additionPost = {
                    id: new Date().toISOString(), 
                    create_at: new Date().toISOString(), 
                    author:  filter(props.usersDict, {'username': localStorage.getItem('SLNUserName')})[0].id, 
                    text: replyComment
                }
        setComments([ ...comments, additionPost]) 
        setReplyComment('')          
    }
    



    function commentPrivateMessege(id, user){
        console.log('commentPrivateMessege with comment ID and UserName ', id, user )
    }

    function commentEdit(id){
        console.log('commentEdit with comment ID', id)
    }

    function commentDelete(id){
        console.log('commentDelete with comment ID', id)
    }


    return (
        <div className={cl.BaseLine}>
            

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

export default connect(
    //mapStateToProps
    state => ({
        comments: state.getComments,
        usersDict: state.usersDict,
        userToken: state.userToken
    }),
    //mapDispatchToProps
    dispatch => ({
        getCommentsAPI: (videoID, userToken) => {
            dispatch(getCommentsThunkAPI(videoID, userToken))
        },
        getUsersDict: () => {
            dispatch(getUserDictAPI())
        }
    })

)(CommentOutput)

