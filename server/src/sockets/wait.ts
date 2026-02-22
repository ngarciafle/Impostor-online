import { Server } from "socket.io";

export function setUpWaitSocket(io: Server) {
  io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-game', (name, gameId) => {
    socket.join(gameId);
    socket.to(gameId).emit('player-joined', name);
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