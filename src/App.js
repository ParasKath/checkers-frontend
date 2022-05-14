import React , {useState,useEffect} from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Controller from './components/Controller/Controller';
import { useCookies } from 'react-cookie';
import './App.css';


const App= ()=> 
{

  const [isLogeedIn,SetLoggedInStatus]= useState(false); 

  const [csrftoken,Setcsrftoken] = useState("");

  const [cookies, setCookie] = useCookies();

  const [pagetype,SetPagetype]= useState("loginpage") 

  const [loginStatus,setLoginStatus] = useState(false);

  const [emailId,SetEmailId] = useState('');
  const loginpage ='loginpage';
  const SignupPage='signupPage';
  const lobby= 'lobby';

  //


  useEffect(()=>{
    console.log(cookies['token'])

  },[]);

  return (
    <div>
      {loginStatus === false && pagetype === loginpage && <LoginPage changePageType = {SetPagetype} setEmailId={SetEmailId} LoginStatus = {setLoginStatus}/>}
      {loginStatus === false && pagetype === SignupPage && <SignUpPage changePageType = {SetPagetype} />}
      {loginStatus === true  && pagetype === lobby &&  <Controller  emailid={emailId} changePageType = {SetPagetype} LoginStatus = {setLoginStatus} />}
    </div>
  );
}

export default App;
