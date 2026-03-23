import Game from "../models/Game";

export const isleader = async (gameId: string, socketId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');

        const player = game.players.find(p => p.socketId === socketId);
        if (!player) throw new Error('Player not found in game');
        
        return player.leader;

    } catch (error) {
        console.error('Error checking leader status:', error);
        throw error;
    }
}