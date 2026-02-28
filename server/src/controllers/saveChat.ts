import Game from "../models/Game";

export const saveChat = async (gameId: string, playerName: string, message: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');

        game.chat.push({ sender: playerName, message: message });
        await game.save();
    } catch (error) {        
        console.error('Error saving chat message:', error);
    }
};