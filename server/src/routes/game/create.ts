import { Response, Request } from 'express';
import { createGame } from '../../controllers/create';

interface gameRequest {
    socketId: string;
    name: string;
}

export const createGameRoute = async (req: Request, res: Response) => {
    const { socketId, name } = req.body as gameRequest;

    try {
        const gameId = await createGame(name, socketId);
        res.status(201).json({ message: 'Game created successfully', gameId });
    } catch (err) {
        console.error('Error creating game:', err);
        res.status(500).json({ message: 'Error creating game' });
    }
}