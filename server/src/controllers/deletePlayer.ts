import Game from "../models/Game";

export const deletePlayer = async (gameId: string, socketId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');
        const playerIndex = game.players.findIndex(p => p.socketId === socketId);
        if (playerIndex === -1) throw new Error('Player not found in game');

        game.players.splice(playerIndex, 1);
        await game.save();

    } catch (err) {
        console.error('Error deleting player:', err);
    }         
}