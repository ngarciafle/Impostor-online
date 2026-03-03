import { Server, Socket } from 'socket.io';
import { controlTurns } from '../controllers/controlTurns';
import Game from '../models/Game';
import { findNextTurnSocket } from '../controllers/findNextTurn';

export function roundWordsSocket(io: Server, socket: Socket) {
  socket.on('words-ready', async ({ gameId }) => {
    const data = await Game.findOne({ gameId });
    if (!data) return;

    data.players.forEach((player: any) => {
        if (player.socketId === socket.id && player.turn) {
            socket.emit('init-turn', { success: true, message: "It's your turn!" });
        }
    })
  })

  // Need to store inside the db the data && distribute word
  // Improve the logic and maybe move it to controllers ???? 
  socket.on('send-word', async ({ gameId, senderName, word }) => {
    const { success, votePhase, nextPlayerSocket } = await controlTurns(gameId, socket.id);
    if (!success) {
      socket.emit('turn-result', { success: false, message: 'Error processing turn' });
      return;
    } 

    if (votePhase) {
      io.to(gameId).emit('round-ended', { message: "Voting phase has started" });
      // Fetch the players when entering to the voting phase
      const gameData = await Game.findOne({ gameId }).select('players');
      const namesData = gameData?.players.map((player: any) => ({ name: player.name, votes: 0 })) || [];
      io.to(gameId).emit('get-players', namesData);
    } else {
      // Find next turn and send init turn
      if (!nextPlayerSocket) return { success: false, message: 'Next player not found' };

      io.to(nextPlayerSocket).emit('init-turn', { success: true, message: "It's your turn!" });
    }


    socket.emit('turn-result', { success: true });

    io.to(gameId).emit('new-word', { sender: senderName, word });
  });

}