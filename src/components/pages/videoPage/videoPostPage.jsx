import React from 'react'
import Header from '../../Header'
import Menu from '../../Menu'
import Footer from '../../Footer'
import image from '../../img/KASATKA.jpg'
import cl from './videoPostPage.module.css'
import { Field } from 'redux-form';
import Button from 'react-bootstrap/Button'

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
                <form>
                    <div className={cl.CommentField}>
                        <p>первый коммент. Маппим Ваши комменты</p>
                    </div>
                    <div className={cl.EnterCommentField}>
                        <input  placeholder="вводим Ваши комменты" />
                        <br/>
                        <button>Комментировать</button>
                    </div>
                </form>



            </div>

            <Footer/>   
            
        </>


    )
}

export default VideoPostPage
