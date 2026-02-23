import { Server } from "socket.io";
import Game from "../models/Game";

export function gameSocket(io: Server, socket: string, word: string, impostor: boolean) {
    io.to(socket).emit('game-started', { message: "All good", word, impostor });
}