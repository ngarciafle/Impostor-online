import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB }  from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

dotenv.config();

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:4321" },
});

// Connect to MongoDB
connectDB();


// WebSocket connection
io.on('connection', (socket) => {
  // Game creation
  socket.on('create-game', (gameId) => {
    socket.join(gameId); // Al unirse el primero, la sala se crea oficialmente
    console.log(`User ${socket.id} creó y se unió a la sala ${gameId}`);
  });
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