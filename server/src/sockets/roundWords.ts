import { Server, Socket } from 'socket.io';
import Game from '../models/Game';

export function roundWordsSocket(io: Server, socket: Socket) {
    socket.on('send-message', ({ gameId, senderName, word }) => {
    io.to(gameId).emit('receive-message', {
      sender: senderName,
      word: word,
      timestamp: new Date().toLocaleTimeString()
    });
  });

}