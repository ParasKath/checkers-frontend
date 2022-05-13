import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function JoinGame({ joingame }) 
{
 
 const [gameid, setGameid] = useState('');

  const FormHandler= (event)=>{
    event.preventDefault();
    joingame(gameid);
  }

  const inputHandler = (event)=>{
      let gameid= event.target.value;
      setGameid(gameid);
  }

  return (
    <div>
      <h1>Join Game</h1>
      <Form
        onSubmit={FormHandler}
      >
        <Form.Group controlId="name">
          <Form.Label>Name of Game</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={gameid}
            onChange={inputHandler}
          />
        </Form.Group>

        <Button
          variant="primary"
          type='submit'
        >
          Join
        </Button>
      </Form>
    </div>
  );
}