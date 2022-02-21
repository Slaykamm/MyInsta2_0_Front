import React from 'react';
import cl from './Footer.module.css'

const Footer = () => {
    return (
        <div className={cl.Outer}>
            <div className={cl.Inner}>
                <p>Slaykam Production (c) 2022</p>
                <p>Contact email: destpoch@mail.ru</p> 
            </div>

        </div>
    );
};

export default Footer;