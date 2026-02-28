import { Server, Socket } from 'socket.io';
import { saveChat } from '../controllers/saveChat';

export function chatSocket(io: Server, socket: Socket) {
    socket.on('send-message', ({ gameId, senderName, message }) => {
    io.to(gameId).emit('new-message', {
      sender: senderName,
      message: message,
    });
    
    try {
      saveChat(gameId, senderName, message);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }

    console.log(`Message sent to game ${gameId} from ${senderName}`);
  });

}