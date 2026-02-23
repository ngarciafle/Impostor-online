import { Request, Response } from 'express';
import { startGame as startGameController } from '../../controllers/start';

interface StartGameRequestBody {
    gameId: string;
    socketId: string;
}

export const startGame = async (req: Request, res: Response) => {
    const { gameId, socketId } = req.body as StartGameRequestBody;
    try {
        await startGameController(gameId, socketId);
        res.status(200).json({ message: 'Game started successfully', success: true });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message, success: false });
    }
}