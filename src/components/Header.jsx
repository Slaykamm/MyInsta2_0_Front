import React from 'react';
import cl from  './CSS/Header.module.css'
import logo from './img/SLN.jpg'

const Header = () => {
    return (
        <>

            <div className={cl.HeaderBody}>
                <img className={cl.Logo} src={logo} alt="logo"/>
                <div className={cl.Header}>
                    <header className={cl.Text}  >
                            Welcome to "Social Life Connects"
                    </header>
                </div>

            </div>
        </>



    );
};

export default Header;