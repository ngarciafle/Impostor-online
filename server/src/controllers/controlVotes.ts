import Game from "../models/Game";

export const controlVotes = async (gameId: string, playerName: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');

        game.votes += 1;
        // Find the voted player & control skip vote
        if (playerName !== null) {
            const votedPlayer = game.players.find(player => player.name === playerName);
            if (!votedPlayer) throw new Error('Voted player not found');
            votedPlayer.votes += 1;
        } 

        await game.save();

        if (game.votes < game.players.length) return;
        

        // Find the player with the most votes
        const maxVotes = Math.max(...game.players.map(player => player.votes));
        const votedOutPlayers = game.players.filter(player => player.votes === maxVotes);

        if (votedOutPlayers.length > 1) return {end: true, vote: 'tie'}; // In case of a tie, no one is voted out

        const votedOutPlayer = votedOutPlayers[0];
        votedOutPlayer.alive = false;
        game.playersOut += 1;

        if (votedOutPlayer.impostor) {
            game.numberOfImpostors! -= 1;
        } else {
            game.numberOfCrewmates! -= 1;
        }

        //Reset votes
        resetVotes(game);

        // End voting phase
        // End game if nº impostors >= nº crewmates
        if (game.players.length - game.playersOut <= 2) {
            game.state = 'end';
        }

        // End game if all impostors are out
        if (game.numberOfImpostors === 0) {
            game.state = 'end';
        }

        await game.save();

    } catch (err) {
        console.log('Error in controlVotes:', err);
    }
}

function resetVotes(game: any) {
    game.votes = 0;
    game.players.forEach((player: any) => {
        player.votes = 0;
    });
    game.save();
}