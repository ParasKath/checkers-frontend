// import React from 'react';
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import { useEffect } from 'react';

// export default function Lobby({
//   joinGame,
//   games,
//   props
// }) {

//   return (
//     <div className="lobby">
//       <Table striped bordered>
//         <thead>
//           <tr>
//             <th>EmailId</th>
//             <th>Total Amount</th>
//             <th>Win</th>
//             <th>Lost</th>
//             <th>Number of Players</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>{props.data[0]}</tr>
//           <tr>{props.data[1]}</tr>
//           <tr>{props.data[2]}</tr>
//           <tr>{props.data[3]}</tr>
//           <tr>{props.data[4]}</tr>
//           {games.length === 0 && (
//             <tr>
//               <td colSpan="3">No games created yet</td>
//             </tr>
//           )}
//           {games.map((game) => (
//             <tr key={game.name}>
//               <td>{game.name}</td>
//               <td>{game.numberOfPlayers} / 2</td>
//               <td>
//                 <Button
//                   onClick={() => joinGame(game.id,"pkath@gmu.edu")}
//                   variant="link">
//                   Join Game
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }