import React, { useEffect, useState } from 'react';
import './Controller.css';
import io from 'socket.io-client';
import CreateNewGame from '../CreateGame/CreateGame';
import Lobby from '../Lobby/Lobby';
import Game from '../Checkersgame/Game';
import JoinGame from '../JoinGame/JoinGame';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Mode from '../Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../Util/NavBar/NavBar';
import Table from 'react-bootstrap/Table';

const PAGE_GAME = 'Game';
const PAGE_LOBBY = 'Lobby';
const PAGE_CREATE_NEW_GAME = 'CreateNewGame';
const PAGE_JOIN_GAME= 'JoinGame';


const  Controller =(props)=> {
  const [page, setPage] = useState('Lobby');
  const [games, setGames] = useState([]);
  const [color, setColor] = useState('');
  const [game, setGame] = useState({ board: [], chat: [] });
  const [gameId, setGameId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  const joinGame = (gameId,email) => {
    games.forEach(game => {
      game.id= game.id.toString();
      if(game.id === gameId) {    
        if(game.numberOfPlayers < 2) {
          socket.emit('join-game', gameId,props.data[0]);
          setPage(PAGE_GAME);
          setGameId(gameId);
        } else 
        {
          setModalTitle("Player Limit");
          setModalText("Sorry Player Limit Reached You cannot Join the game");
          setShowModal(true);
        }
      }
    })
    
  };

  const movePiece = ({ selectedPiece, destination }) => {
    socket.emit('move-piece', {
      selectedPiece,
      destination,
    });
  };

  useEffect(() => {
    const game = games.find((g) => g.id === gameId);
    if (!game) {
      setGame({
        board: [],
      });
    } else {
      setGame(game);
    }
  }, [games, gameId]);

  const leaveGame = () => {
    setGame(PAGE_LOBBY);
    socket.emit('leave-game');
  };

  const createGame = (name) => {
    
    socket.emit('create-game', name,props.data[0]);
    setPage(PAGE_GAME);
  };

  const sendChat = (message) => {
    socket.emit('chat-message', message);
  };


  useEffect(() => {
    const url  ="https://backend-checkers.herokuapp.com";
    const newSocket = io(url, {
      transports: ['websocket'],
      rejectUnauthorized: false
    });

    newSocket.on('disconnect', () => {
      setGameId(null);
      setColor('');
      setPage(PAGE_LOBBY);

      alert('The server crashed or restarted');
    });
    newSocket.on('games', (games) => {
      setGames(games);
    });
    newSocket.on('your-game-created', (gameId) => {
      setGameId(gameId);
    });
    newSocket.on('color', (color) => setColor(color));

    newSocket.on('end-game', () => {
      
      setGameId(null);
      setColor('');
      setPage(PAGE_LOBBY);
      setShowModal(true);
      setModalText('Your opponent has left the game So you Win');
      setModalTitle('Game Over');
      
    });
    newSocket.on('winner', (winner) => {
      setShowModal(true);
      setModalText(`${winner} has won the game!`);
      setModalTitle('Game Over');
    });
    setSocket(newSocket);
  }, []);

  const handleCloseModal = () => setShowModal(false);

  const Mainpage= [
    {title:"Lobby",
     pagetype:"Lobby"
    },
    {title:"Create Game",
     pagetype:"CreateNewGame"
    },
    {title:"Join Game",
     pagetype:"JoinGame"
    },
    
  ]

  const GamePage= [
    {title:"Lobby",
     pagetype:"Lobby"
    },
  ]

  let data=Mainpage;

  if(page=== PAGE_GAME)
  {
    data=GamePage;
  }



  return (
    <React.Fragment>
      <NavBar setPage={setPage} logoutHandler={props.logout} data={data}/>
      <Container>
        <Row>
          <Col>
          {page === PAGE_LOBBY && (
              <div className="lobby">
      <Table striped bordered>
        <thead>
          <tr>
            <th>EmailId</th>
            <th>Total Amount</th>
            <th>Win</th>
            <th>Lost</th>
            <th>Number of Players</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>{props.data[0]}</td>
          <td>{props.data[1]}</td>
          <td>{props.data[2]}</td>
          <td>{props.data[3]}</td>
          <td>{props.data[4]}</td>
          </tr>
        </tbody>
      </Table>
    </div>
            )}
            {page === PAGE_CREATE_NEW_GAME && (
              <CreateNewGame createGame={createGame} />
            )}
            {page=== PAGE_JOIN_GAME && (<JoinGame joingame={joinGame}/>) }
            
            {page === PAGE_GAME && game && (
              <Game
                color={color}
                game={game}
                leaveGame={leaveGame}
                movePiece={movePiece}
                sendChat={sendChat}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Mode showModal={showModal} modalTitle={modalTitle} modalText={modalText} handleCloseModal={handleCloseModal}/>
      </React.Fragment>
  );
}

export default Controller;