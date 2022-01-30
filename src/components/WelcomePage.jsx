import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
import LoginForm from '../modules/LoginForm/LoginForm';

const WelcomePage = () => {
    return (
        <div>
            <Header/>
            <Menu/>
            <LoginForm/>
            <Footer/>

        </div>
    );
};

export default WelcomePage;