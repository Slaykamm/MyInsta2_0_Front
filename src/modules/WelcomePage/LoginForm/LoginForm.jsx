import React from 'react';
import cl from './LoginForm.module.css'
import { reduxForm, Field} from 'redux-form';
import MyInput from './MyInput/MyInput';
import MyButton from '../../../UI/MyButton/MyButton';
import { requiredField, passwordSymbolsValidate, loginSybmolsValidate, minLengthLogin } from './Validators/validatorsLogin';

const LoginForm = ({RegistrationProcess, ...props}) => {


    return (
        <div className={cl.LoginFormOuterContainer}> 
            <div className={cl.LoginFormInnerContainer}>
                <div>
                    <form onSubmit={props.handleSubmit}>
                        {props.isError 
                        ?<h5>Неправильно введен логин или пароль!</h5>
                        :<p></p>
                        }
                        <div>
                            <Field 
                                name={'username'}
                                type='text' 
                                placeholder='Enter Login'
                                component={MyInput}
                                validationMessage="Логин должен быть длиннее 3х символов и содержать заглавные и прописные латинские буквы"
                                validate={[requiredField, loginSybmolsValidate]}

                            /> 
                        </div>

                        <div>
                            <Field
                                name={'password'}
                                type='password' 
                                placeholder='Enter Password'
                                component={MyInput}
                                validationMessage="Пароль должен быть длиннее 8 символов. Содержать цифры, латинские буквы и спецсимволы"
                                validate={[requiredField, passwordSymbolsValidate]}

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
                        <MyButton>Логин</MyButton>
                    </form>
                    
                    <div className ={cl.RegBut}>
                        <MyButton
                        onClick={RegistrationProcess}
                        >
                            Зарегистрироваться</MyButton>
                    </div>

                </div>



            </div>




        </div>
    );
};

export default LoginForm;