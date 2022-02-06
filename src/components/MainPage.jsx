import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { store } from '../redux/reducers';
import { useState } from 'react';
import MovieDispatch from '../modules/MovieDispatch/MovieDispatch';



const MainPage = () => {

const [listFiles, setListFiles] = useState()
const [searchQuery, setSearchQuery] = useState('')
const [filteredPosts, setFilteredPosts] = useState()


if (!listFiles) {
    const photosGet = axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
    photosGet.then(responce =>{

        setListFiles(responce.data)

    })

}
// Блок фильтрации роликов//////////////////////////////////////////
function checkTheInput(event){
    setSearchQuery(event.target.value)

}

const outPutFiles = () => {
    if (listFiles && searchQuery.length > 2 ){
        var filtered = listFiles.filter(title=>title.title.includes(searchQuery))

        return filtered
    }
    else {
        return listFiles
    }
}

        // заканчиваем////////////////////////////////////////////////////






    return (
        <div>
            <Header/>
            <Menu 
                value={searchQuery}
                onChange={checkTheInput}/>
            
            <div>
                Hello World!

                { listFiles ? 
                    <div className="container">
                        <div className="row">
                            { outPutFiles().map(photo =>
                            
                            <div key={photo.id} className="col-6 col-md-4">
                            <MovieDispatch url={photo.url} id={photo.id} title={photo.title}/>    
                            </div>
                            )}
                        </div>
                    </div>
                : <p>Waiting for Data</p>
                }

            </div>

            <Footer/>
        </div>
    );
};

export default MainPage;