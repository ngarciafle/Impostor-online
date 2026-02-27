import Game from "../models/Game";

export const resetGame = async (gameId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');


    } catch (error) {        
        console.error('Error resetting game:', error);
        throw error;
    }
}