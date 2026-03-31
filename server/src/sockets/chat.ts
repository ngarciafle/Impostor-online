import { Server, Socket } from 'socket.io';
import { saveChat } from '../controllers/saveChat';
import { messageSchema } from '../utils/zod';
import { getBaseChat } from '../controllers/getBaseChat';

export function chatSocket(io: Server, socket: Socket) {
    socket.on('send-message', ({ senderName, message }) => {
    const gameId = socket.data.gameId;
    if (!gameId) return;
    
    const validation = messageSchema.safeParse({ senderName, message });

    if (!validation.success) {
      console.error('Validation error:', validation.error);
      return;
    }
    
    
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
  
  socket.on("get-chat", async () => {
    const chat = await getBaseChat(socket.data.gameId);
    if (chat.length === 0) return;
    socket.emit("get-chat", { messages: chat });
  })
}