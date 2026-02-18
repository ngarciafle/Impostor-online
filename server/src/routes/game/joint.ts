import { Response, Request } from 'express';
import { joinGame } from '../../controllers/join';

interface gameRequest {
    socketId: string;
    playerName: string;
}

export const joinGameRoute = async (req: Request, res: Response) => {
    const { socketId, playerName } = req.body as gameRequest;

    try {
        await joinGame(playerName, socketId);
        res.status(201).json({ message: 'Player joined game successfully' });
    } catch (err) {
        console.error('Error joining game:', err);
        res.status(500).json({ message: 'Error joining game' });
    }
}