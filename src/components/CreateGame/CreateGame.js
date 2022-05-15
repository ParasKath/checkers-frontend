import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateNewGame({ createGame }) {

  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  const [csrftoken,SetcsrfToken] = useState('');

  useEffect(()=>{

    fetch("https://backend-checkers.herokuapp.com/checkers/api/v1/user/getCsrf")
    .then(response=>response.json())
    .then(answer=>{
      let responsecode = answer.responseCode;
      let statusMessage = answer.statusMessage;
      if(responsecode === 200)
      {
        if(statusMessage === 'Success')
        {
          SetcsrfToken(answer.response.csrf);
        }
    }
    })
    .catch(error=>{

    }) 

 },[])


  const [name, setName] = useState('');

  const gameCodeHandler= (event)=>{

    const enteredEmail = event.target.value;

        if (enteredEmail.includes('@') === true) {
            if (emailRegex.test(enteredEmail) === true) {
                setName(enteredEmail);
            }
        }
  }
  const FormHandler= (event)=>{
    event.preventDefault();

    console.log(event.target[1].value);

    const data={
      email:name,
      _csrf:event.target[1].value
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
  };

  fetch('https://backend-checkers.herokuapp.com/checkers/api/v1/user/CreateGame', requestOptions)
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
        createGame(answer.response.gamecode);
      }
    }
  })
  .catch(err=>{
    console.log("While enbtering code");
  })

    
  }

  return (
    <div>
      <h1>Create New Game</h1>
      <Form
        onSubmit={FormHandler}
      >
        <Form.Group controlId="name">
          <Form.Label>Email-Id of the Person</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            onChange={gameCodeHandler}
          />
        </Form.Group>
        <Form.Control type='hidden' name = "_csrftoken"  value={csrftoken}></Form.Control>

        <Button
          variant="primary"
          type='submit'
        >
          Create
        </Button>
      </Form>
    </div>
  );
}