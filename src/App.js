import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './modules/WelcomePage/WelcomePage';
import MainPage from './components/pages/main/MainPage';
import VideoPostPage from './components/pages/videoPage/videoPostPage';


const App = () => {
  return (
    <div>

      <Routes>
        {/* <Route path="/" element={<WelcomePage/>}/> */}
        <Route path="/" element={<MainPage/>}/>
        {/* <Route path="main/" element={<MainPage/>} /> */}
        {/* <Route path="main/video/:id" element={<VideoPostPage/>}/> */}
        <Route path="video/:id" element={<VideoPostPage/>}/>

      </Routes>




    </div>
  );
};

export default App;