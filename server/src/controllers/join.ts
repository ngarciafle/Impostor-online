import Game from '../models/Game';



export const joinGame = async (name: string, socketId: string, gameId: string) => {
  try {
    const game = await Game.findOne({ gameId });
    if (!game) throw new Error('Game not found');
    game.players.push({ name: name, socketId, leader: false, impostor: false, turn: false, votes: 0, alive: true, hasVoted: false });
    await game.save();
  } catch (err) {
    console.error('Error joining game:', err);
  }
}