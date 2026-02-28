import { Server } from "socket.io";
import { waitSocket } from "./wait";
// import { gameSocket } from "./game";
import { chatSocket } from "./chat";
import { roundWordsSocket } from "./roundWords";
import { socketVotes } from "./votes";
import { deletePlayer } from "../controllers/deletePlayer";
import { leaveGameSocket } from "./leaveGame";

export function setUpSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    waitSocket(io, socket);
    // gameSocket(io, socket);
    chatSocket(io, socket);
    roundWordsSocket(io, socket);
    socketVotes(io, socket);
    leaveGameSocket(io, socket);

    socket.on('disconnect', async () => {
      console.log('User disconnected:', socket.id);

      if (socket.data.gameId) {
        await deletePlayer(socket.data.gameId, socket.id);
      }

    });
  });
}