import { Server } from "socket.io";
import { waitSocket } from "./wait";
// import { gameSocket } from "./game";
import { chatSocket } from "./chat";
import { roundWordsSocket } from "./roundWords";
import { socketVotes } from "./votes";
import { deletePlayer } from "../controllers/deletePlayer";


export function setUpSocket(io: Server) {
  io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  waitSocket(io, socket);
  // gameSocket(io, socket);
  chatSocket(io, socket);
  roundWordsSocket(io, socket);
  socketVotes(io, socket);

  socket.on('disconnect', async () => {
    console.log('User disconnected:', socket.id);
    await deletePlayer(socket.data.gameId, socket.id);
  });
});

}