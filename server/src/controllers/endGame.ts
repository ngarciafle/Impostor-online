import Game from "../models/Game";

export const endGame = async (gameId: string) => {
    try {
        await Game.deleteMany({ gameId });
    } catch (error) {
        console.error('Error ending game:', error);
        throw error;
    }
}