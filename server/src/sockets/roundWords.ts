import { Server, Socket } from 'socket.io';
import { controlTurns } from '../controllers/controlTurns';
import Game from '../models/Game';

export function roundWordsSocket(io: Server, socket: Socket) {

  // Need to store inside the db the data && distribute word
  // Improve the logic and maybe move it to controllers ???? 
  socket.on('send-word', async ({ gameId, senderName, word }) => {
    const { success, votePhase, nextPlayer } = await controlTurns(gameId, socket.id);
    if (!success) {
      socket.emit('turn-result', { success: false, message: 'Error processing turn' });
      return;
    } 

    if (votePhase) {
      io.to(gameId).emit('round-ended', { message: "Voting phase has started" });
      // Fetch the players when entering to the voting phase
      const gameData = await Game.findOne({ gameId }).select('players');
      io.to(gameId).emit('get-players', { players: gameData?.players || [] });
    }


    socket.emit('turn-result', { success: true });

    socket.to(gameId).emit('new-word', { sender: senderName, word });
  });

}