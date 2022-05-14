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
    console.log(games);
    games.forEach(game => {
      game.id= game.id.toString();
      if(game.id === gameId) {    
        if(game.numberOfPlayers < 2) {
          socket.emit('join-game', gameId,props.emailid);
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
    
    socket.emit('create-game', name,props.emailid);
    setPage(PAGE_GAME);
  };

  const sendChat = (message) => {
    socket.emit('chat-message', message);
  };


  useEffect(() => {
    const url  ="http://127.0.0.1:4000";
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
      setModalText('Your opponent has left the game');
      setModalTitle('Game Over');
      console.log("Hello from we have to hit at the backend from here end game");
      
      
    });
    newSocket.on('winner', (winner) => {
      alert(`${winner} has won the game!`);
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
    {title:"Logout",
     pagetype:"Lobby"
    }
  ]

  const GamePage= [
    {title:"Lobby",
     pagetype:"Lobby"
    },
    {title:"Logout",
     pagetype:"JoinGame"
    }
  ]

  let data=Mainpage;

  if(page=== PAGE_GAME)
  {
    data=GamePage;
  }



  return (
    <React.Fragment>
      <NavBar setPage={setPage} data={data}/>
      <Container>
        <Row>
          <Col>
          {page === PAGE_LOBBY && (
              <Lobby
                games={games}
                setPage={setPage}
                joinGame={joinGame}
              />
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