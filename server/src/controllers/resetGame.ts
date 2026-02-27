import Game from "../models/Game";

export const resetGame = async (gameId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');
        if (game.state !== 'end') throw new Error('Unable to reset game, game is not in end state');

        game.state = 'waiting';
        game.content = { word: '', hint: '' };
        game.votes = 0;
        game.playersOut = 0;
        game.numberOfImpostors = 0;
        game.numberOfCrewmates = 0;
        game.words = [];
        for (const player of game.players) {
            player.impostor = false;
            player.alive = true;
            player.votes = 0;
            player.hasVoted = false;
            player.turn = false;
        }
        await game.save();
    } catch (error) {        
        console.error('Error resetting game:', error);
        throw error;
    }
}