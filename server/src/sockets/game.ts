import { Server, Socket } from "socket.io";
import Game from "../models/Game";

export function gameSocket(io: Server, gameId: string, word: string, hint: string) {
    io.to(gameId).emit('gameStarted', { gameId, word, hint });
}