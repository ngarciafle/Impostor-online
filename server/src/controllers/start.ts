import Game from "../models/Game";

export const startGame = async (gameId: string, socketId: string) => {
    try {
        const game = await Game.findOne({ gameId});
        if (!game) throw new Error('Game not found');

        const player = game.players.find(p => p.socketId === socketId);
        if (!player) throw new Error('Player not found in game');
        if (!player.leader) throw new Error('Player is not the leader');

        game.state = 'card';
        // add call to websocket pass words
        await game.save();
    } catch (error) {
        throw error;
    }
}