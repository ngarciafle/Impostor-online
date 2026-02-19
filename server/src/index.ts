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

//Temporary
// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Game creation (El host crea y se une a su sala)
  socket.on('create-game', (gameId) => {
    socket.join(gameId);
    console.log(`User ${socket.id} creó y se unió a la sala ${gameId}`);
  });

  // Un jugador invitado intenta unirse
  socket.on('join-game', ({ gameId, playerName }) => {
    const roomExist = io.sockets.adapter.rooms.has(gameId);

    if (roomExist) {
      socket.join(gameId);
      console.log(`User ${socket.id} joined game ${gameId}`);
      
      // 1. Le confirmamos al que acaba de entrar
      socket.emit('join-response', { success: true });

      // 2. ¡NUEVO! Le avisamos al RESTO de la sala que alguien nuevo entró
      // Usamos socket.to() para emitir a todos en la sala EXCEPTO al que acaba de unirse
      socket.to(gameId).emit('player-joined', { socketId: socket.id, playerName });
      
    } else {
      console.log(`User ${socket.id} intentó unirse a la sala fantasma ${gameId}`);
      socket.emit('join-response', { success: false, message: 'La sala no existe. Revisa el código.' });
    }
  });

  // El Chat de la sala de espera
  socket.on('send-message', ({ gameId, senderName, message }) => {
    // ¡NUEVO! Enviamos el mensaje estructurado con el nombre del jugador
    io.to(gameId).emit('receive-message', {
      sender: senderName,
      text: message,
      timestamp: new Date().toLocaleTimeString()
    });
    console.log(`Message sent to game ${gameId} from ${senderName}`);
  });

  // ¡NUEVO! Manejo de desconexiones
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Nota: Como no sabemos en qué sala estaba al desconectarse, 
    // en un juego real aquí buscarías al usuario en tu BD o memoria
    // y emitirías un evento 'player-left' a su sala correspondiente.
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});