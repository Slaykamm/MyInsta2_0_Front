import React from 'react';
import cl from './LoginForm.module.css'
import { reduxForm, Field} from 'redux-form';
import MyInput from './MyInput';

const LoginForm = (props) => {
    console.log("isError", props.isError)
    return (
        <div className={cl.LoginFormOuterContainer}> 
            <div className={cl.LoginFormInnerContainer}>
                <form onSubmit={props.handleSubmit}>
                    {props.isError 
                    ?<h5>Не правильно введен логин или пароль!</h5>
                    :<p></p>
                    }
                    <div>
                        <Field 
                            name={'username'}
                            type='text' 
                            placeholder='Enter Login'
                            component={MyInput}
                            validationMessage="Логин не верный"

                        /> 
                    </div>

                    <div>
                        <Field
                            name={'password'}
                            type='password' 
                            placeholder='Enter Password'
                            component={MyInput}
                            validationMessage="Пароль не верный"

                        />
                    </div>

                    {/* <div style={{display:'flex'}}>
                        <Field className={cl.InputRemember}
                            name={'UserRememberMe'}
                            type="checkbox"
                            component={'input'}
                            
                            
                    />
                    <span style={{marginLeft:'5px', marginTop:'-5px'}}>Запомнить меня</span>                       
                    </div> */}
                    <br/>
                    <button className={cl.Button}>Логин</button>
                </form>



            </div>




        </div>
    );
};

export default LoginForm;