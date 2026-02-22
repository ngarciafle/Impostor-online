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


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});