import Game from "../models/Game";

export const controlTurns = async (gameId: string, socketId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');

        const currentPlayerIndex = game.players.findIndex(p => p.socketId === socketId);
        if (currentPlayerIndex === -1) throw new Error('Player not found in game');
        if (!game.players[currentPlayerIndex].turn) throw new Error('Not your turn');

        let votePhase = false;
        let nextIdx = findNextPlayer(game, currentPlayerIndex);
        
        if (nextIdx === -1) {
            game.state = 'votes'; 
            votePhase = true;
            nextIdx = 0; // Reset to first player for voting phase
        }

        game.players[currentPlayerIndex].turn = false;
        game.players[nextIdx].turn = true; // Decide whose turn is next
        
        await game.save();
        return { success: true, votePhase, nextPlayerSocket: game.players[nextIdx].socketId };
    } catch (err) {
        console.log('Error in controlTurns:', err);
        return { success: false };
    }
}


// Helper function to find the next alive player
function findNextPlayer(game: any, currentIndex: number) {
    let nextIdx = currentIndex + 1;
    for (; nextIdx < game.players.length; nextIdx++) {
        if (game.players[nextIdx].alive) {
            return nextIdx;
        }
    }
    return -1; // No alive players found
}