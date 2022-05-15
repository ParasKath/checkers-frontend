import React, { useState } from 'react';
import LoginandSignInTemplate from '../../Util/LoginAndSignInTemplate';
import { useCookies } from 'react-cookie';

const LoginPage = (props) => {

    
    
    
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
    const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");


    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const [emailerror,SetEmailError]= useState(false);
    const [passworderror,SetpasswordError]= useState(false);
    const [successmessage,Setsuccessmessage]= useState(false);
    const [submissionerror,Setsubmissionerror] = useState(false);
    const [submissionmessage,Setsubmissionmessage] = useState('');
    
    const [cookies, setCookie] = useCookies();



    const EmailChangeHandler = (event) => {

        const enteredEmail = event.target.value;

        if (enteredEmail.includes('@') === true) {
            if (emailRegex.test(enteredEmail) === true) {
                SetEmail(enteredEmail);
            }
            else
            {
                SetEmailError(true);
            }
        }
    }

    const PasswordChangeHandler = (event) => {

        const enteredPassword = event.target.value;

        if (enteredPassword.length >= 8) {
            if (passwordRegex.test(enteredPassword) === true) {
                SetPassword(enteredPassword);
            }
            else
            {
                SetpasswordError(true);
            }
        }

    }

    const SingUpHandler = ()=>{
        props.changePageType('signupPage');
    }

    const FormHandler = (event) => {
        event.preventDefault();

        if (email === '' || password === '') {
            return;
        }
        else {
            const data = {
                email: email,
                password: password
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };


            fetch('https://backend-checkers.herokuapp.com/checkers/api/v1/user/login', requestOptions)
                .then((response) => {
                    return response.json()
                })
                .then(answer => {
                    let statuscode = answer.responseCode;
                    let message = answer.statusMessage;

                    console.log();
                    if (statuscode === 200) {
                        if (message === 'Success') {
                            setCookie('token',answer.response.result.token,{path:'/'});
                            Setsuccessmessage(true);
                            props.changePageType('lobby');
                            props.LoginStatus(true);
                        
                        }
                    }
                    else if (statuscode === 401) {
                        if (message === "User doesn't Exists." || message === "InvalidPassword.") 
                        {
                            Setsubmissionerror(true);
                            Setsubmissionmessage("Wrong Credentials");
                        }
                    }

                })
                .catch(err => {
                    Setsubmissionerror(true);
                    Setsubmissionmessage("Internal Server Error Please try again later");
                })
        }



    }

    return (
        <LoginandSignInTemplate>
            <h3 className="login-heading mb-4">Welcome back!</h3>
            <form onSubmit={FormHandler}>
            {emailerror && <label className='error'>Wrong Email</label>}
                <div className="form-floating mb-3">
                    <input type="email" onChange={EmailChangeHandler} className="form-control" required id="floatingInput" placeholder="name@example.com" />
                    <label >Email address</label>
                </div>
                {passworderror && <label className='error'>Minimum length 8 with 1 special character,1 upercase and 1 lowercase mandatory</label>}
                <div className="form-floating mb-3">
                    <input type="password" onChange={PasswordChangeHandler} className="form-control" required id="floatingPassword" placeholder="Password" />
                    <label >Password</label>
                </div>
                {submissionerror && <label className='error'>{submissionmessage}</label>}
                {successmessage && <label className='success'>Thanks for Login</label>}
                <div className="d-grid">
                    <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Login</button>
                    <div className="text-center">
                    </div>
                </div>
                <div className="d-grid">
                    <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="button" onClick={SingUpHandler}>Sign in</button>
                    <div className="text-center">
                    </div>
                </div>
            </form>
        </LoginandSignInTemplate>

    )
}
export default LoginPage;