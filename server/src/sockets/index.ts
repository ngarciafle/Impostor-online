import { Server } from "socket.io";
import { waitSocket } from "./wait";
// import { gameSocket } from "./game";
import { chatSocket } from "./chat";
import { roundWordsSocket } from "./roundWords";
import { socketVotes } from "./votes";
import { deletePlayer } from "../controllers/deletePlayer";
import { leaveGameSocket } from "./leaveGame";
import Game from "../models/Game";

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
    const game = await Game.findOne({ "players.socketId": socket.id });
    if (!game) return; // Player was not in a game
    await deletePlayer(game.gameId, socket.id);
  });
});

}