import Game from "../models/Game";

export const controlVotes = async (gameId: string, playerName: string, socketId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');

        const player = game.players.find((player: any) => player.socketId === socketId);
        if (!player) throw new Error('Player not found in game');
        if (player.hasVoted) throw new Error('Player already voted');

        if (player.name === playerName) {
            console.log('Player attempted to vote for themselves:', playerName);
            return {end: false, vote: 'bad-vote'}; // Prevent voting for oneself
        }

        player.hasVoted = true;

        game.votes += 1;
        // Find the voted player & control skip vote
        if (playerName !== null) {
            console.log('Player name received for voting:', playerName);
            const votedPlayer = game.players.find(player => player.name === playerName);
            console.log('Voted player:', votedPlayer);
            console.log('Player name received:', playerName);
            if (!votedPlayer) throw new Error('Voted player not found');
            votedPlayer.votes += 1;
        } 

        await game.save();

        const alivePlayers = game.players.filter((p: any) => p.alive).length;
        if (game.votes < alivePlayers) return {vote: 'not-all-voted'}; // Not all players have voted yet
        

        // Find the player with the most votes
        const maxVotes = Math.max(...game.players.map(player => player.votes));
        const votedOutPlayers = game.players.filter(player => player.votes === maxVotes);

        if (votedOutPlayers.length > 1) {
            resetVotes(game);
            await game.save();
            return {end: false, vote: 'tie'}; // In case of a tie, no one is voted out
        }

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
        let impostorsWin: boolean  = false;
        
        // End game if nº impostors >= nº crewmates
        if (game.numberOfCrewmates! <= game.numberOfImpostors!) {
            game.state = 'end';
            impostorsWin = true;
            game.impostorsWin = true;
        }

        // End game if all impostors are out
        if (game.numberOfImpostors === 0) {
            game.state = 'end';
            game.impostorsWin = false;
        }

        
        await game.save();

        return {end: game.state === 'end', vote: votedOutPlayer.name, impostorsWin: game.impostorsWin};

    } catch (err) {
        console.log('Error in controlVotes:', err);
    }
}

function resetVotes(game: any) {
    game.votes = 0;
    game.players.forEach((player: any) => {
        player.votes = 0;
        player.hasVoted = false;
    });
}

export async function resetTurnsNewRound(gameId: string) {
    const game = await Game.findOne({ gameId });
    if (!game) throw new Error('Game not found');

    game.players.forEach((p: any) => p.turn = false);

    const firstAlive = game.players.find((p: any) => p.alive);
    if (!firstAlive) return null; // No alive players, should not happen but just in case

    firstAlive.turn = true;
    await game.save();

    return firstAlive.socketId;
}