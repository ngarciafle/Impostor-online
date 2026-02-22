import { Server } from "socket.io";
import Game from "../models/Game";

export function setUpWaitSocket(io: Server) {
  io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-game', async ({name, gameId}) => {
    socket.join(gameId);

    const game = await Game.findOne({ gameId });
    if (!game) {
      console.error(`Game with ID ${gameId} not found`);
      return;
    }

    const players = game.players.map(player => player.name);

    io.to(gameId).emit('player-joined', players);
    console.log(`${name} joined game ${gameId}`);
  });

  socket.on('send-message', ({ gameId, senderName, message }) => {
    // ¡NUEVO! Enviamos el mensaje estructurado con el nombre del jugador
    io.to(gameId).emit('receive-message', {
      sender: senderName,
      text: message,
      timestamp: new Date().toLocaleTimeString()
    });
    console.log(`Message sent to game ${gameId} from ${senderName}`);
  });

  // 
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

}