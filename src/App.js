import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import MainPage from './components/MainPage';
import VideoPostPage from './components/pages/videoPage/videoPostPage';


const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/main" element={<MainPage/>} />
        <Route path="/video" element={<VideoPostPage/>} />

      </Routes>




    </div>
  );
};

export default App;