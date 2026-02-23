import { Server, Socket } from "socket.io";
import Game from "../models/Game";

export function gameSocket(io: Server, socket: Socket) {
  socket.on('start-game', async ({ gameId }) => {});
}