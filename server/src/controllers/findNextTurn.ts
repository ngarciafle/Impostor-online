import Game from "../models/Game";

export const findNextTurnSocket = async (gameId:string, currentSocketId: string) => {
    try {
        const gameData = await Game.findOne({ gameId }).select('players');
        if (!gameData) return null;

        const currentPlayerIndex = gameData.players.findIndex(p => p.socketId === currentSocketId);
        if (currentPlayerIndex === -1) return null;

        const nextPlayerIndex = (currentPlayerIndex + 1) % gameData.players.length;
        return gameData.players[nextPlayerIndex].socketId;
    } catch (err) {
        console.error("Error finding next turn socket:", err);
        return null;
    }
}