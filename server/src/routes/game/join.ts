import { Response, Request } from 'express';
import { joinGame } from '../../controllers/join';

interface gameRequest {
    socketId: string;
    name: string;
    gameId: string;
}

export const joinGameRoute = async (req: Request, res: Response) => {
    const { socketId, name, gameId } = req.body as gameRequest;
    
    try {
        await joinGame(name, socketId, gameId);
        res.status(201).json({ message: 'Player joined game successfully', gameId, success: true });
    } catch (err) {
        console.error('Error joining game:', err);
        res.status(500).json({ message: 'Error joining game', success: false });
    }
}