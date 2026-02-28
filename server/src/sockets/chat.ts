import { Server, Socket } from 'socket.io';
import Game from '../models/Game';

export function chatSocket(io: Server, socket: Socket) {
    socket.on('send-message', ({ gameId, senderName, message }) => {
    io.to(gameId).emit('new-message', {
      sender: senderName,
      message: message,
    });
    console.log(`Message sent to game ${gameId} from ${senderName}`);
  });

}