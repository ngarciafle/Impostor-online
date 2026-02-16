import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:4321" },
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || /*configure mongo url */'', {
  // --> CONFIGURE MONGO OPTIONS ** <-- 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('join-game', (gameId) => {
    const roomExist = io.sockets.adapter.rooms.has(gameId);

    if (roomExist) {
      socket.join(gameId);
      console.log(`User ${socket.id} joined game ${gameId}`);
      // to the client if successfully joined the room
      socket.emit('join-response', { success: true });
    } else {
      console.log(`User ${socket.id} intentó unirse a la sala fantasma ${gameId}`);
      // to the client if the room doesn't exist
      socket.emit('join-response', { success: false, message: 'La sala no existe. Revisa el código.' });
    }
  });

  socket.on('send-message', ({ gameId, message }) => {
    io.to(gameId).emit('receive-message', message);
    console.log(`Message sent to game ${gameId}:`, message);
  });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});