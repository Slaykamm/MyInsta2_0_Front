import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './modules/WelcomePage/WelcomePage';
import MainPage from './components/pages/main/MainPage';
import VideoPostPage from './components/pages/videoPage/videoPostPage';
import UserCabinet from './modules/UserCabinet/UserCabinet';
import SimpleForm from './components/test/test'




const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate replace to='main/'/>}/>
        <Route path='main/' element={<MainPage/>} />
        <Route path='lk/' element={<UserCabinet/>} />
        <Route path="main/video/:id" element={<VideoPostPage/>}/>
        <Route path='login/' element={<WelcomePage/>} />
        <Route path='simple/' element={<SimpleForm/>} />
      </Routes>
    </div>
  );
};

export default App;