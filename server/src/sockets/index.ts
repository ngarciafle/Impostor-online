import { Server } from "socket.io";
import { waitSocket } from "./wait";
import { gameSocket } from "./game";


export function setUpSocket(io: Server) {
  io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  waitSocket(io, socket);
  gameSocket(io, socket);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

}