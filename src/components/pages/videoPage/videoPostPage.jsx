import React from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import Footer from '../../Footer'
import image from '../../img/KASATKA.jpg'
import cl from './videoPostPage.module.css'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { Field } from 'redux-form';
import Button from 'react-bootstrap/Button'
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



import '../../../../node_modules/video-react/dist/video-react.css'
import { useParams } from 'react-router-dom'
import { getVideoAPI } from '../../../API/getVideoAPI'



function VideoPostPage(props) {
    const params = useParams()
    console.log(params.id)


    useEffect(()=>{
        props.getVideo(params.id)
    },[])

    console.log('getVideo', props.video)


    return (
        <>
            <Header/>
            <Menu
                placeholder='Поиск автора в комментариях'
            />  
            {props.video
            ?
                <div className={cl.BaseLayer}>
                    <div className={cl.BaseLine}>
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
                                    <VolumeMenuButton disabled />
                                </ControlBar>
                            </Player>






                        </div>
                        <br/>
                        <div>
                            <ul className={cl.VideoMenuOptions}>
                                <li>
                                    Просмотры:
                                </li>
                                <li>
                                    Лайки:
                                </li>
                                <li>
                                    Дизлайки:
                                </li>
                                <li>
                                </li>

                            </ul>
                            <p>
                                        <a href='/video'>Название:</a>
                            </p> 
                        </div>
                        
                        {/* Дописать логику на форму ввода и сделать саму форму.  */}
                    </div>
                    {/* <CommentOutput/> */}
                    <Footer/>   
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
        video: state.getVideo
        }),

    //mapDispatchToProps

    dispatch => ({
        getVideo: (value) =>{
            dispatch(getVideoAPI(value))
        },

    })
    
    
    )(VideoPostPage);
