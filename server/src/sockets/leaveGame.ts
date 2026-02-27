import { Server, Socket } from "socket.io";
import { controlVotes } from "../controllers/controlVotes";
import { deletePlayer } from "../controllers/deletePlayer";

export const leaveGameSocket = async (io: Server, socket: Socket) => {
    socket.on('leave-game', async () => {
        try {
            await deletePlayer(socket.data.gameId, socket.id);
        } catch (err) {
            console.error('Error leaving game:', err);
        }
    });
}