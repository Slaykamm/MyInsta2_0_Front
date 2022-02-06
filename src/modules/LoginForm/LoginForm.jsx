import React from 'react';
import cl from './LoginForm.module.css'
import { reduxForm, Field} from 'redux-form';

const LoginForm = (props) => {
    return (
        <div className={cl.LoginFormOuterContainer}> 
            <div className={cl.LoginFormInnerContainer}>
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <Field 
                            name={'UserLogin'}
                            type='text' 
                            placeholder='Enter Login'
                            component={'input'}
                        /> 
                    </div>

                    <div>
                        <Field
                            name={'UserPassword'}
                            type='password' 
                            placeholder='Enter Password'
                            component={'input'}
                        />
                    </div>

                    <div style={{display:'flex'}}>
                        <Field className={cl.InputRemember}
                            name={'UserRememberMe'}
                            type="checkbox"
                            component={'input'}
                    />
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