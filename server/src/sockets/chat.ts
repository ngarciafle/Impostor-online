import { Server, Socket } from 'socket.io';
import Game from '../models/Game';

export function chatSocket(io: Server, socket: Socket) {
    socket.on('send-message', ({ gameId, senderName, message }) => {
    io.to(gameId).emit('receive-message', {
      sender: senderName,
      text: message,
      timestamp: new Date().toLocaleTimeString()
    });
    console.log(`Message sent to game ${gameId} from ${senderName}`);
  });

}