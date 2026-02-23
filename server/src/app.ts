import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB }  from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { setUpSocket } from './sockets/index';
import { setUpRoutes } from './routes/index';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:4321" },
});

// Set up routes and sockets
setUpRoutes(app, io);
setUpSocket(io);


// Connect to MongoDB
await connectDB();


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});