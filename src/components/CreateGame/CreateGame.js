import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateNewGame({ createGame }) {

  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  const [name, setName] = useState('');
  const FormHandler= (event)=>{
    event.preventDefault();

    const data={
      email:name
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
  };

  fetch('http://127.0.0.1:4000/checkers/api/v1/user/CreateGame', requestOptions)
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
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>

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