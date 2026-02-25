import { Server, Socket } from "socket.io";
import { controlVotes } from "../controllers/controlVotes";

export const socketVotes = async (io: Server, socket: Socket) => {
    socket.on('send-vote', (data) => {
          const { gameId, playerName } = data;
          controlVotes(gameId, playerName);
        });
}