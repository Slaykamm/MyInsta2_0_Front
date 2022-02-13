import React from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import Footer from '../../Footer'
import image from '../../img/KASATKA.jpg'
import cl from './videoPostPage.module.css'
import { Field } from 'redux-form';
import Button from 'react-bootstrap/Button'
import CommentOutput from '../commentOutput/CommentOutput'

function VideoPostPage() {
    return (
        <>
            <Header/>
            <Menu/>  

            <div className={cl.BaseLine}>
                <div className={cl.PostOuter}>
                    <img className={cl.Frame} src={image} alt="logo"/> 
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
            <CommentOutput/>
            <Footer/>   
            
        </>


    )
}

export default VideoPostPage
