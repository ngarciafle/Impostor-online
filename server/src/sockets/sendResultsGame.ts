import { Server, Socket } from "socket.io";
import { checkResults } from "../controllers/checkResults";

export const sendResultsGameSocket = async (io: Server, socket: Socket) => {
    socket.on("get-game-info", async ({ }) => {
        const gameId = socket.data.gameId;
        if (!gameId) return;

        try {
            const { impostors, crewmates, winner } = await checkResults(gameId);

            for (const impostorsId of impostors) {
                io.to(impostorsId).emit("game-info", { role: 'impostor', winner });
            }
            for (const crewmatesId of crewmates) {
                io.to(crewmatesId).emit("game-info", { role: 'crewmate', winner });
            }
        } catch (err: any) {
            console.error('Error getting game info:', err);
            socket.emit("game-info", { error: err.message });
            return;
        }
    });
}
