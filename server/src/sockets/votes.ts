import { Server, Socket } from "socket.io";
import { controlVotes } from "../controllers/controlVotes";
import { resetTurnsNewRound } from "../controllers/controlVotes";

export const socketVotes = async (io: Server, socket: Socket) => {
    let voteData: any;
    socket.on('send-vote', async (data) => {
        const { gameId, playerName } = data;
        voteData = await controlVotes(gameId, playerName, socket.id);

        if (voteData.vote === 'bad-vote') {
            io.to(socket.id).emit('bad-vote');
            return;
        }

        // Send vote to all players to update the UI
        io.to(gameId).emit('add-vote', playerName);


        if (voteData.vote === 'not-all-voted') return; // Not all players have voted yet

        io.to(gameId).emit('vote-result', voteData.vote);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // If the game has ended -> move to end and send info to show
        if (voteData.end) {
            io.to(gameId).emit('end-game');
            io.to(gameId).emit('end-info', {impostorWin: voteData.impostorWin});
            return;
        }
        
        const firstPlayerSocketId = await resetTurnsNewRound(gameId);
        
        io.to(gameId).emit('round-ended');

        if (firstPlayerSocketId) {
            io.to(firstPlayerSocketId).emit('init-turn', { success: true, message: "It's your turn!" });
        }
        });
}