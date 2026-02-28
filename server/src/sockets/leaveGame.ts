import { Server, Socket } from "socket.io";
import { deletePlayer } from "../controllers/deletePlayer";
import Game from "../models/Game";

export const leaveGameSocket = async (io: Server, socket: Socket) => {
    socket.on('leave-game', async () => {
        try {
            const game = await Game.findOne({ gameId: socket.data.gameId });
            if (!game) return; // Player was not in a game
            
            const data = await deletePlayer(game.gameId, socket.id);
            if (!data) return; // Player was not found in the game

            const updatedGame = await Game.findOne({ gameId: game.gameId });
            if (updatedGame) {
                io.to(game.gameId).emit('players-left', updatedGame.players.map(p => p.name));
            }


            if (!data.newLeader) return; // If there are no more players in the game
            
            io.to(game.gameId).emit('player-left', socket.id);
            
            if (data.leader) {
                io.to(data.newLeader).emit('new-leader', data.leader); 
            } 
            socket.leave(game.gameId);
            socket.data.gameId = null;
        } catch (err) {
            console.error('Error leaving game:', err);
        }
    });
}