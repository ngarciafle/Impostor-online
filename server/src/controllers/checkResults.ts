import Game from "../models/Game";

export const checkResults = async (gameId: string) => {
    try {
        const game = await Game.findOne({ gameId });

        if (!game) throw new Error('Game not found');
        if (game.state !== 'end') throw new Error('Unable to check results, game is not in end state');

        const impostors = game.players.filter((p: any) => p.impostor).map((p: any) => p.socketId);
        const crewmates = game.players.filter((p: any) => !p.impostor).map((p: any) => p.socketId);

        return { impostors, crewmates, winner: game.impostorsWin ? 'impostor' : 'crewmate' };
    } catch (error) {
        console.error('Error checking results:', error);
        throw error;
    }
}