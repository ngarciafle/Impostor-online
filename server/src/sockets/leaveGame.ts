import { Server, Socket } from "socket.io";
import { controlVotes } from "../controllers/controlVotes";
import { deletePlayer } from "../controllers/deletePlayer";
import Game from "../models/Game";

export const leaveGameSocket = async (io: Server, socket: Socket) => {
    socket.on('leave-game', async () => {
        try {
            const game = await Game.findOne({ "players.socketId": socket.id });
            if (!game) return; // Player was not in a 
            
            if (game.state === 'waiting') {
            game.players = game.players.filter(p => p.socketId !== socket.id);
            await game.save();
            io.to(game.gameId).emit('player-left', socket.id);
            }
    
            const data = await deletePlayer(game.gameId, socket.id);
    
            if (!data) return; // Player was not found in the game
            if (!data.leader) return; // If player was not leader
            if (!data.newLeader) return; // If there are no more players in the game
    
            io.to(data.newLeader).emit('new-leader', data.leader); 
        } catch (err) {
            console.error('Error leaving game:', err);
        }
    });
}