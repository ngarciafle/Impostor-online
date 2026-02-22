import Game from "../models/Game";

export const getRole = async (gameId: string, socketId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');

        const player = game.players.find(p => p.socketId === socketId);
        if (!player) throw new Error('Player not found in game');

        return { leader: player.leader, impostor: player.impostor, success: true };
    } catch (err) {
        console.error('Error getting role:', err);
        return { success: false };
    }
}