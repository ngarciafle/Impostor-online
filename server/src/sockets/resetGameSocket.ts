import { Server, Socket } from "socket.io";
import { resetGame } from "../controllers/resetGame";
import { isleader } from "../controllers/isLeader";

export function resetGameSocket(io: Server, socket: Socket) {
  socket.on("reset-game", async ({}) => {
    const gameId = socket.data.gameId;
    if (!gameId) return;

    // Only the leader can reset the game
    const leader = await isleader(gameId, socket.id);
    if (!leader) return;

    try {
      resetGame(gameId);
      io.to(gameId).emit("game-reset", { message: "The game has been reset" });
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  });
}
