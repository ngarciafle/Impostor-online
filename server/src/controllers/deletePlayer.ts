import Game from "../models/Game";

export const deletePlayer = async (gameId: string, socketId: string) => {
    try {
        const game = await Game.findOne({ gameId });
        if (!game) throw new Error('Game not found');
        const playerIndex = game.players.findIndex(p => p.socketId === socketId);
        console.log('Player index to delete:', playerIndex);
        console.log('Current players before deletion:', game.players);
        console.log('Socket ID to delete:', socketId);
        if (playerIndex === -1) throw new Error('Player not found in game');

        // Assign new leader if the leaving player is the leader
        const leader = game.players[playerIndex].leader;
        let nextIdx = -1;
        let newLeaderSocketId = null;
        if (leader && game.players.length > 1) {
            nextIdx = (playerIndex + 1) % game.players.length;
            newLeaderSocketId = game.players[nextIdx].socketId;
        }

        // Change db
        if (nextIdx !== -1) game.players[nextIdx].leader = true;
        game.players.splice(playerIndex, 1);
        await game.save();

        return { leader, newLeader: nextIdx !== -1 ? newLeaderSocketId : null };
    } catch (err) {
        console.error('Error deleting player:', err);
    }         
}