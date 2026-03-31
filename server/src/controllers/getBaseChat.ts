import Game from "../models/Game";

export const getBaseChat = async (gameId: string) => {
    console.log(`Fetching chat for game ID: ${gameId}`);
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');
        return game.chat;
    } catch (error) {        
        console.error('Error retrieving chat messages:', error);
        return [];
    }
}