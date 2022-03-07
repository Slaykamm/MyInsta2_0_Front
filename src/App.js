import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './modules/WelcomePage/WelcomePage';
import MainPage from './components/pages/main/MainPage';
import VideoPostPage from './components/pages/videoPage/videoPostPage';
import UserCabinet from './modules/UserCabinet/UserCabinet';
import RegistrationPage from './components/pages/RegistrationPage/RegistrationPage';
import ClearUserService from './modules/WelcomePage/ClearUserService/ClearUserService';
import UserVideoPage from './components/pages/userVideo/userVideoPage';





const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate replace to='login/'/>}/>
        <Route path='main/' element={<MainPage/>} />
        <Route path='lk/' element={<UserCabinet/>} />
        <Route path="main/video/:id" element={<VideoPostPage/>}/>
        <Route path='login/' element={<WelcomePage/>} />
        <Route path='login/registration/' element={<RegistrationPage/>} />
        <Route path='userclean/' element={<ClearUserService/>}/>
        <Route path='userVideoPage/' element={<UserVideoPage/>}/>
      </Routes>
    </div>
  );
};

export default App;