import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Menu from '../../../modules/Menu/Menu';
import { connect } from  'react-redux';
import { getVideoPreviewsAPI } from '../../../API/getPreviewAPI'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { store } from '../../../redux/reducers';
import { useState} from 'react';
import MovieDispatch from '../MovieDispatch/MovieDispatch';
import { useEffect } from 'react';
import { arrayRemoveAll } from 'redux-form';
import { filterQuery } from '../../../services/filterQuery';
import cl from './MainPage.module.css'
import Nav from 'react-bootstrap/Nav'
import { Routes, Route } from 'react-router-dom';



const MainPage = (props) => {

const [listFiles, setListFiles] = useState()
const [searchQuery, setSearchQuery] = useState('')


//TODO какгохо хрена надо 2 раза дергать
useEffect(()=>{
    props.getPreviewAPI()
},[])

useEffect(()=>{
    setListFiles(props.videoPreviews)
},[props.videoPreviews])


// Блок фильтрации роликов//////////////////////////////////////////
function checkTheInput(event){
    setSearchQuery(event.target.value)
}

const filteredVideo=filterQuery(listFiles, searchQuery)
// ВСЕ


    return (
        <div>

            <div>
                        <Header/>
                        <Menu 
                            value={searchQuery}
                            onChange={checkTheInput}
                            placeholder='Поиск в названиях'
                        />
                        
                        <div  className={cl.BaseLayer}>
                            <div className={cl.BaseFrame}>

                                { listFiles ? 
                                    <div className="container">
                                        <div className="row">
                                            { filteredVideo.map(video =>
                                            
                                            <div key={video.id} className="col-6 col-md-4">
                                                    <MovieDispatch url={video.image} id={video.id} title={video.title}/>      
                                            </div>



                                           
                                            )}
                                        </div>
                                    </div>
                                : <p>Waiting for Data</p>
                                }

                            </div>
                        </div>

                        <Footer/>
            </div>



        </div>

    );
};



export default connect(
    // mapStateToProps
    state => ({
        videoPreviews: state.getPreview
    }),

    //mapDispatchToProps
    dispatch => ({
        getPreviewAPI: () =>{
            dispatch(getVideoPreviewsAPI())
        },

    })




)(MainPage); 