import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Menu from '../../../modules/Menu/Menu';
import { connect } from  'react-redux';
import { getVideoPreviewsAPI } from '../../../API/getPreviewAPI'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import { useEffect } from 'react';
import { filterQuery } from '../../../services/filterQuery';
import VideoContainer from './VideoContainer/VideoContainer';


const MainPage = (props) => {

const [listFiles, setListFiles] = useState()



//TODO какгохо хрена надо 2 раза дергать
useEffect(()=>{
    props.getPreviewAPI()
},[])

useEffect(()=>{
    setListFiles(props.videoPreviews)
},[props.videoPreviews])


// Блок фильтрации роликов//////////////////////////////////////////
const [searchQuery, setSearchQuery] = useState('')
function checkTheInput(event){
    setSearchQuery(event.target.value)
}

const filteredVideo=filterQuery(listFiles, searchQuery)

// ВСЕ

 
    return (
        <div>

            <div>
                <Header/>
                {/* <Menu 
                    value={searchQuery}
                    onChange={checkTheInput}
                    placeholder='Поиск в названиях'
                /> */}
                <Menu
                    value={searchQuery}
                    onChange={checkTheInput}
                    placeholder='Поиск в названиях'
                />
                <VideoContainer
                listFiles={listFiles}
                filteredVideo={filteredVideo}
                />
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