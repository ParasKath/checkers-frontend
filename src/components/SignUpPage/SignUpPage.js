import React, { useState} from 'react';
import LoginandSignInTemplate from '../../Util/LoginAndSignInTemplate';
import './SignupPage.css';

const SignUpPage = (props) => {

  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
  const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [passwordAgain, SetPasswordAgain] = useState('');

  const [emailerror,SetEmailError]= useState(false);
  const [passworderror,SetpasswordError]= useState(false);
  const [repassworderror,Setrepasswroderror]= useState(false);
  const [successmessage,Setsuccessmessage]= useState(false);
  const [submissionerror,Setsubmissionerror] = useState(false);
  const [submissionmessage,Setsubmissionmessage] = useState('');

  const formCleaner= (event)=>{
    for(let i=0;i<3;i++)
    {
      event.target[i].value='';
    }
  }

  const FormHandler = (event) => {
    event.preventDefault();
    
    
    if(email==='' || password==='' || passwordAgain==='')
    {
      return;
    }
    else
    {
      const data={
        email:email,
        password:password
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
  
    fetch('http://127.0.0.1:4000/checkers/api/v1/user/signUp', requestOptions)
    .then((response) =>{
      return response.json()
    })
    .then(answer =>{ 
      let statuscode = answer.responseCode;

      let message = answer.statusMessage

      if(statuscode===200)
      {
        if(message==='Success')
        {
          Setsuccessmessage(true);
        }
      }
      else if(statuscode===401)
      {
        if(message==='User already Exists.')
        {
          Setsubmissionmessage("Email Id Already taken");
          Setsubmissionerror(true);
        }
      }

      formCleaner(event);
    
    })
    .catch(err=>{
      Setsubmissionmessage("Internal Server Error Please try again later");
      Setsubmissionerror(true);
    })
    }

    

  }

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

  const AgainPasswordHandler = (event) => {

    const ReEnterPassword = event.target.value;

    if (ReEnterPassword.length >= 8) 
    {
      if (passwordRegex.test(ReEnterPassword) === true)
      {
        if((ReEnterPassword === password) === true) 
        {
          SetPasswordAgain(ReEnterPassword);
        }
        else
        {
          Setrepasswroderror(true);
        }
      }
      else
      {
        Setrepasswroderror(true);
      }
       
    }

  }

  return (
    <LoginandSignInTemplate>
      <h3 className="login-heading mb-4">Sign Up</h3>
      <form onSubmit={FormHandler}>
      {emailerror && <label className='error'>Wrong Email</label>}
        <div className="form-floating mb-3">
          <input type="email" onChange={EmailChangeHandler}  className="form-control" id="floatingInput" required placeholder="name@example.com" />
          <label >Enter Email address</label>
        </div>
       {passworderror && <label className='error'>Minimum length 8 with 1 special character,1 upercase and 1 lowercase mandatory</label>}
        <div className="form-floating mb-3">
          <input type="password" onChange={PasswordChangeHandler}  className="form-control" id="Password" placeholder="Password" required />
          <label >Enter Password</label>
        </div>
        { repassworderror && <label className='error'>Password Does not match</label>}
        <div className="form-floating mb-3">
          <input type="password" onChange={AgainPasswordHandler}  className="form-control" id="FinalPassword" required placeholder="Password" />
          <label >ReEnter Password</label>
        </div>

        <div className="d-grid">
          <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Sign in</button>
          <div className="text-center">
          </div>
        </div>
        {submissionerror && <label className='error'>{submissionmessage}</label>}
        {successmessage && <label className='success'>Thanks for Signup</label>}
      </form>
    </LoginandSignInTemplate>
  )

}

export default SignUpPage;