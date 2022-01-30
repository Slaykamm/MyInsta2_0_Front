import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { useState } from 'react';
import MovieDispatch from '../modules/MovieDispatch/MovieDispatch';



const MainPage = () => {

const [listFiles, setListFiles] = useState()


if (!listFiles) {
    const photosGet = axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
    photosGet.then(responce =>{
        console.log(responce.data)
        setListFiles(responce.data)
    })

}







console.log("ssssssss", listFiles)
    return (
        <div>
            <Header/>
            <Menu/>
            
            <div>
                Hello World!

                { listFiles ? 
                    <div className="container">
                        <div className="row">
                            { listFiles.map(photo =>
                            
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