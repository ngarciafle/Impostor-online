import { Server, Socket } from "socket.io";
import Game from "../models/Game";

export function waitSocket(io: Server, socket: Socket) {

  socket.on('join-game', async ({name, gameId}) => {
    socket.join(gameId);

    const game = await Game.findOne({ gameId });
    if (!game) {
      console.error(`Game with ID ${gameId} not found`);
      return;
    }

    const player = game.players.find(p => p.socketId === socket.id);    
    socket.emit("leader-role", { leader: player?.leader || false });

    const players = game.players.map(player => player.name);
    io.to(gameId).emit('player-joined', players);
    console.log(`${name} joined game ${gameId}`);
  });

}