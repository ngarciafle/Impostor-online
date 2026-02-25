import Game from "../models/Game";

export const controlVotes = async (gameId: string, playerName: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');

        game.votes += 1;
        // Find the voted player
        const votedPlayer = game.players.find(player => player.name === playerName);
        if (votedPlayer) votedPlayer.votes += 1;

        await game.save();

        if (game.votes < game.players.length) return;
        
        // End voting phase

        // End game if nº impostors >= nº crewmates
        if (game.players.length - game.playersOut <= 2) {
            game.state = 'end';
        }

        // End game if all impostors are out
        


    } catch (err) {
        console.log('Error in controlVotes:', err);
    }
}