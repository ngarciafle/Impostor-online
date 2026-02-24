import Game from "../models/Game";
import { gameSocket } from '../sockets/game';
import { Server } from 'socket.io';
import content from "../content.json";


export const startGame = async (gameId: string, socketId: string, io: Server) => {
    try {
        const game = await Game.findOne({ gameId});
        if (!game) throw new Error('Game not found');

        const player = game.players.find(p => p.socketId === socketId);
        if (!player) throw new Error('Player not found in game');
        if (!player.leader) throw new Error('Unable to start game, player is not the leader');

        const randomIdx = Math.floor(Math.random() * content.length);
        const { word, hint } = content[randomIdx];
        game.content.word = word;
        game.content.hint = hint;

        // Calculate impostors
        const numPlayers = game.players.length;
        const numImpostors = Math.floor(numPlayers / 4);
        const shuffled = [...game.players];
        // Better shuffle with Fisher-Yates algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }   
        // Assign impostor roles
        for (let i = 0; i < numImpostors; i++) {
            shuffled[i].impostor = true;
        }

        for (const player of game.players) {
            if (player.impostor) {
                gameSocket(io, player.socketId, hint, player.impostor);
            } else {
                gameSocket(io, player.socketId, word, player.impostor);
            }
        }
        game.state = 'card';
        await game.save();
        await new Promise(resolve => setTimeout(resolve, 10000));

        game.state = 'round';
        // Shuffle again to randomize turn order
        const shuffledAgain = [...game.players];
        for (let i = shuffledAgain.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledAgain[i], shuffledAgain[j]] = [shuffledAgain[j], shuffledAgain[i]];
        }   


        game.players = shuffledAgain;
        game.players[0].turn = true; // Start with the first player

        
        await game.save();
        io.to(gameId).emit('round-started', { message: "Round has started" });
    } catch (error) {
        throw error;
    }
}
