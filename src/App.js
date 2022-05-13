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

  const loginpage ='loginpage';
  const SignUpPage='signupPage';
  const lobby= 'lobby';

  //console.log(cookies)


  useEffect(()=>{
  
  


  },[]);

  return (
    <div>
      <Controller/>
    </div>
  );
}

export default App;
