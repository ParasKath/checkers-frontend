import React , {useState,useEffect} from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Controller from './components/Controller/Controller';
import { useCookies } from 'react-cookie';
import './App.css';


const App= ()=> 
{

  const [cookies, setCookie,removeCookie] = useCookies();

  const [pagetype,SetPagetype]= useState("loginpage") 

  const [loginStatus,setLoginStatus] = useState(false);

  const [data,setData] = useState([]);
 

  const loginpage ='loginpage';
  const SignupPage='signupPage';
  const lobby= 'lobby';

  
  useEffect(()=>{
    const data = {
      token:cookies['token'],
  }
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
    
    fetch("https://backend-checkers.herokuapp.com/checkers/api/v1/user/GetData",requestOptions)
    .then(response=>response.json())
    .then(answer=>{
      let responsecode = answer.responseCode;
      let statusMessage = answer.statusMessage;
      if(responsecode === 200)
      {
        if(statusMessage === 'Success')
        {
          console.log(answer);
          let temp = [];
          temp.push(answer.response.email);
          temp.push(answer.response.betAmount);
          temp.push(answer.response.win);
          temp.push(answer.response.lost);
          temp.push(answer.response.gamesplayed);
        
          setData(temp);
          setLoginStatus(true);
          SetPagetype('lobby');
          
        }
      else
        {
          setLoginStatus(false);
          SetPagetype('loginpage'); 
        }
    }
    })
    .catch(error=>{
      setLoginStatus(false);
      SetPagetype('loginpage');
    })
  },[]);

  const LogoutHandler=()=>{
    removeCookie("token");
    setLoginStatus(false);
    SetPagetype('loginpage'); 
  }

  return (
    <div>
      {loginStatus === false && pagetype === loginpage && <LoginPage changePageType = {SetPagetype}  LoginStatus = {setLoginStatus}/>}
      {loginStatus === false && pagetype === SignupPage && <SignUpPage changePageType = {SetPagetype} />}
      {loginStatus === true  && pagetype === lobby &&  <Controller logout={LogoutHandler}  data={data} changePageType = {SetPagetype} LoginStatus = {setLoginStatus} />}
    </div>
  );
}

export default App;
