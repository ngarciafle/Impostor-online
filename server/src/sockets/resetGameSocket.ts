import { Server, Socket } from 'socket.io';
import { resetGame } from '../controllers/resetGame';

export function resetGameSocket(io: Server, socket: Socket) {
    socket.on('reset-game', ({ }) => {
        const gameId = socket.data.gameId;
        if (!gameId) return;

        try {
            resetGame(gameId);
            io.to(gameId).emit('game-reset', { message: "The game has been reset" });
        } catch (error) {
            console.error('Error resetting game:', error);
        }
    });
}