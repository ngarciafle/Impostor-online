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

        gameSocket(io, gameId, word, hint);
        game.state = 'card';
        // add call to websocket pass words
        await game.save();
    } catch (error) {
        throw error;
    }
}