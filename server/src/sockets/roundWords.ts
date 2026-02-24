import { Server, Socket } from 'socket.io';
import { controlTurns } from '../controllers/controlTurns';

export function roundWordsSocket(io: Server, socket: Socket) {
  //     sender: senderName,
  //     word: word,
  //     timestamp: new Date().toLocaleTimeString()


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
    }

    io.to(gameId).emit('init-turn', { nextPlayer });  

    socket.emit('turn-result', { success: true });
  });

}