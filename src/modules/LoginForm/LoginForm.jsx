import React from 'react';
import cl from './LoginForm.module.css'

const LoginForm = () => {
    return (
        <div className={cl.LoginFormOuterContainer}> 
            <div className={cl.LoginFormInnerContainer}>
                <form>
                    <div>
                        <input 
                                    type='text' 
                                    placeholder='Login'
                                /> 
                    </div>

                    <div>
                        <input
                                    type='password' 
                                    placeholder='Password'
                        />
                    </div>

                    <div style={{display:'flex'}}>
                        <input className={cl.InputRemember}
                                type="checkbox"/>
                                <span style={{margin:'0px'}}>Remember me</span>                       
                    </div>
                    <br/>
                    <button className={cl.Button}>Submit</button>
                </form>



            </div>




        </div>
    );
};

export default LoginForm;