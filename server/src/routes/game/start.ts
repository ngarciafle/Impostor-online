import { Request, Response } from 'express';
import { startGame as startGameController } from '../../controllers/start';
import { Server } from 'socket.io';


interface StartGameRequestBody {
    gameId: string;
    socketId: string;
}

export const startGame = async (req: Request, res: Response, io: Server) => {
    const { gameId, socketId } = req.body as StartGameRequestBody;
    try {
        await startGameController(gameId, socketId, io);
        res.status(200).json({ message: 'Game started successfully', success: true });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message, success: false });
    }
}