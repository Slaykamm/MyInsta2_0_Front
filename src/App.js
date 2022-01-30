import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';

import WelcomePage from './components/WelcomePage';


const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/main" element={<MainPage/>} />

      </Routes>




    </div>
  );
};

export default App;