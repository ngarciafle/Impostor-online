import { Server } from "socket.io";
import { waitSocket } from "./wait";
// import { gameSocket } from "./game";
import { chatSocket } from "./chat";
import { roundWordsSocket } from "./roundWords";


export function setUpSocket(io: Server) {
  io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  waitSocket(io, socket);
  // gameSocket(io, socket);
  chatSocket(io, socket);
  roundWordsSocket(io, socket);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

}