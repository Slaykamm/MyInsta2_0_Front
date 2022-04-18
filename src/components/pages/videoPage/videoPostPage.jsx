import React from 'react'
import Header from '../header/Header'
import Menu from '../../../modules/Menu/Menu'
import Footer from '../footer/Footer'
import cl from './videoPostPage.module.css'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import CommentOutput from '../commentOutput/CommentOutput'
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
  } from 'video-react';
import { get, filter } from 'lodash'
import { getUserDictAPI } from '../../../API/getUserDictAPI'
import { getUsersDict } from '../../../redux/Selectors/baseSelectors'



import '../../../../node_modules/video-react/dist/video-react.css'
import { useParams } from 'react-router-dom'

import { getVideoAPI } from '../../../API/getVideoAPI'



function VideoPostPage(props) {
    const params = useParams()
    const [videoID, setVideoID] = useState('')

    if (!videoID){
        setVideoID(params.id)
    }

    useEffect(()=>{
        props.getVideo(params.id)
    },[videoID])

    const clickAuthor = e => console.log('clickHere')

    return (
        <>
            <Header/>
            <Menu
                placeholder='Поиск автора в комментариях'
            />  
            {props.video
            ?   
                <div>


                    <div className={cl.BaseLayer}>
                        <div className={cl.BaseLine}>
                            <h2>{props.video.title}</h2>
                            <div className={cl.PostOuter}>

                                <Player
                                    className={cl.Frame}
                                    playsInline
                                    poster={props.video.image}
                                    src={props.video.video}
                                >
                                    <ControlBar>
                                        <ReplayControl seconds={10} order={1.1} />
                                        <ForwardControl seconds={30} order={1.2} />
                                        <CurrentTimeDisplay order={4.1} />
                                        <TimeDivider order={4.2} />
                                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                                        <VolumeMenuButton enabled />
                                    </ControlBar>
                                </Player>


                            </div>
                            <br/>
                            <div className={cl.VideoMenuOptions}>
                                <p>
                                    <span>Описание видео: </span> 
                                    {props.video.description}
                                </p>
                                <p 
                                    onClick={clickAuthor}
                                    className={cl.AuthorHover}
                                >
                                    <span 
                                        >Автор: </span> 
                                    {get(filter(props.usersDict, {'author': props.video.author}),[0, 'username'])}
                                </p>
                            </div>
                            
                        </div>
                        <CommentOutput videoID={videoID}/>
                        <hr/>
                        
                        <Footer/>   
                    </div>   
                </div>     


            :
                <p> Ожидаение Видео! </p>
                
        
        
        
        }


            
        </>


    )
}



export default connect(
    //mapStateToProps
    state => ({
        video: state.getVideo,
        usersDict: getUsersDict(state),

        }),

    //mapDispatchToProps

    dispatch => ({
        getVideo: (value) =>{
            dispatch(getVideoAPI(value))
        },
    getUsersDict: () => {
        dispatch(getUserDictAPI())
    },

    })
    
    
    )(VideoPostPage);
