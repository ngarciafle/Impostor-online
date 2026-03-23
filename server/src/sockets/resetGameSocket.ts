import { Server, Socket } from "socket.io";
import { resetGame } from "../controllers/resetGame";
import { isleader } from "../controllers/isLeader";

export function resetGameSocket(io: Server, socket: Socket) {
  socket.on("reset-game", ({}) => {
    const gameId = socket.data.gameId;
    if (!gameId) return;
    // Only the leader can reset the game
    isleader(gameId, socket.id)
      .then((isLeader) => {
        if (!isLeader) {
          console.error(
            `Player with socket ID ${socket.id} is not the leader and cannot reset the game`,
          );
          return;
        } else {
          console.log(
            `Player with socket ID ${socket.id} is the leader and is resetting the game`,
          );
        }
      })
      .catch((error) => {
        console.error("Error checking leader status:", error);
        return;
      });

    try {
      resetGame(gameId);
      io.to(gameId).emit("game-reset", { message: "The game has been reset" });
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  });
}
