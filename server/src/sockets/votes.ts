import { Server, Socket } from "socket.io";
import { controlVotes } from "../controllers/controlVotes";

export const socketVotes = async (io: Server, socket: Socket) => {
    let voteData: any;
    socket.on('send-vote', async (data) => {
        const { gameId, playerName } = data;
        voteData = await controlVotes(gameId, playerName, socket.id);

        if (voteData == null) return; // Not all players have voted yet

        io.to(gameId).emit('vote-result', voteData.vote);

        new Promise((resolve) => setTimeout(resolve, 5000));

        // If the game has ended -> move to end and send info to show
        if (voteData.end) {
            io.to(gameId).emit('end-game');
            io.to(gameId).emit('end-info', {impostorWin: voteData.impostorWin});
            return;
        }

        io.to(gameId).emit('round-ended');
        });
}