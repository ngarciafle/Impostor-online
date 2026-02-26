import { Server, Socket } from 'socket.io';
import { controlTurns } from '../controllers/controlTurns';
import Game from '../models/Game';

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
      io.to(gameId).emit('get-players', { players: gameData?.players || [] });
    } else {
      // io.to(nextPlayerSocket).emit('init-turn', { success: true, message: "It's your turn!" });
      //*** HOW TO SENT TO THE NEXT TURN OF WORD */
    }


    socket.emit('turn-result', { success: true });

    io.to(gameId).emit('new-word', { sender: senderName, word });
  });

}