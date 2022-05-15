import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames';


import './Game.css';

const colorMap = {
  0: 'empty',
  1: 'red',
  2: 'black',
  3: 'red',
  4: 'black',
};

export default function Game({
  leaveGame,
  movePiece,
  game,
  color,
  sendChat,
}) {
  const [selectedPiece, setSelectedPiece] = useState({});
  const [chatText, setChatText] = useState('');
  const [Player1Bet,setPlayer1Bet]= useState(40);
  const [Player2Bet,setPlayer2Bet]=useState(50);

  useEffect(() => {
    return () => leaveGame();
  }, []);

  const selectPiece = (i, j) => {
    if (game.turn !== color) return;
    if (colorMap[game.board[i][j]] !== color) return;
    setSelectedPiece({ i, j });
  };

  const dropSelectedPiece = (i, j) => {
    if (game.turn !== color) return;
    if (game.board[i][j] !== 0) return;
    if ((i + j) % 2 === 1) return;
    movePiece({
      selectedPiece,
      destination: {
        i,
        j,
      },
    });
    setSelectedPiece({});
  };

  const isPieceSelected = (i, j) => {
    return selectedPiece.i === i && selectedPiece.j === j;
  };

  const getColor = (piece) =>
    piece === 1 ? 'red' : 'black';

  const renderBoard = () => {
    return (
      <div className="board">
        {game.board.map((row, i) => (
          <div key={i} className="row">
            {row.map((piece, j) => (
              <div
                key={`${i} ${j}`}
                className={classNames('cell', {
                  gray: (i + j) % 2 === 0,
                  white: (i + j) % 2 !== 0,
                })}
                onClick={() => dropSelectedPiece(i, j)}
              >
                {piece !== 0 && (
                  <div
                    className={classNames('piece', {
                      selected: isPieceSelected(i, j),
                      red: piece === 1,
                      black: piece === 2,
                      blackQueen: piece === 4,
                      redQueen: piece === 3,
                      clickable: color === getColor(piece),
                    })}
                    onClick={() => selectPiece(i, j)}
                  ></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderBatting = () => {
    return (
      <div>
        <h2>Betting Amount</h2>
        <label>Player 1 = 50 points </label>
        <label>Player 2 = 50 points</label>
        <h2>People Can talk here</h2>
        {game.chat &&
          game.chat.map((message, idx) => (
            <div key={idx}>{message}</div>
          ))}

      </div>
    );
  };

  const isGameStarted = () => game.numberOfPlayers === 2;

  const renderWaiting = () => {
    return (
      <Col>
        <div className="text-center">
          <h2 className="mb-4">Let the Other Player Join</h2>
          <div className="mb-4">
            <Spinner animation="border" role="status" />
          </div>
          <span>Waiting for an opponent....</span>
        </div>
      </Col>
    );
  };

  const renderGame = () => {
    return (
      <>
        <Col>
          <div>Your piece color is {color}</div>
          {game.turn === color && (
            <div>It is your turn!</div>
          )}
          {game.turn !== color && (
            <div>Waiting for opponent!</div>
          )}
          {renderBoard()}
        </Col>
        <Col>{renderBatting()}</Col> 
        
        
      </>
    );
  };

  return (
    <React.Fragment>
    <Row>
      {!isGameStarted() && renderWaiting()}
      {isGameStarted() && renderGame()}
    </Row>
    </React.Fragment>
  );
}