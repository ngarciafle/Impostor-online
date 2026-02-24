import Game from "../models/Game";

export const controlTurns = async (gameId: string, socketId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');

        const currentPlayerIndex = game.players.findIndex(p => p.socketId === socketId);
        if (currentPlayerIndex === -1) throw new Error('Player not found in game');
        if (!game.players[currentPlayerIndex].turn) throw new Error('Not your turn');

        let votePhase = false;
        let nextIdx = currentPlayerIndex + 1;
        game.players[currentPlayerIndex].turn = false;
        game.players[0].turn = true; // Loop back to the first player

        if (currentPlayerIndex === game.players.length - 1) {
            game.state = 'votes'; 
            votePhase = true;
            nextIdx = 0; // Reset to first player for voting phase
        }
        await game.save();
        return { success: true, votePhase, nextPlayer: game.players[nextIdx].socketId };
    } catch (err) {
        console.log('Error in controlTurns:', err);
        return { success: false };
    }
}