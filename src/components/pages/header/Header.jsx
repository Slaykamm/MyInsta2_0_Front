import React from 'react';
import cl from  './Header.module.css'
import logo from '../../img/SLN2.jpg'
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>

            <div className={cl.HeaderBody}>
                <NavLink to={`/`}>
                    <img className={cl.Logo} src={logo} alt="logo"/>
                </NavLink>

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