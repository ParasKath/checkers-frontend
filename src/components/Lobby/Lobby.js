import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';

export default function Lobby({
  joinGame,
  games,
}) {


// useEffect(()=>{

//   fetch("http://127.0.0.1:4000/checkers/api/v1/security/tokenInformation",{
//     method:'GET',
//   })
//   .then(response=>{
//     console.log(response);
//     return response.json();
//   })
//   .then(answer=>{
//     console.log(answer+" Hello from the ");
//   })
//   .catch(error=>{
//     console.log(error);
//   })

// },[])

  return (
    <div className="lobby">
      <Table striped bordered>
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Number of Players</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 && (
            <tr>
              <td colSpan="3">No games created yet</td>
            </tr>
          )}
          {games.map((game) => (
            <tr key={game.name}>
              <td>{game.name}</td>
              <td>{game.numberOfPlayers} / 2</td>
              <td>
                <Button
                  onClick={() => joinGame(game.id,"pkath@gmu.edu")}
                  variant="link">
                  Join Game
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}