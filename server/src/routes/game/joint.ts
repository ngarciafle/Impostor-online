import { Response, Request } from 'express';
import { joinGame } from '../../controllers/join';

interface gameRequest {
    socketId: string;
    playerName: string;
    gameId: string;
}

export const joinGameRoute = async (req: Request, res: Response) => {
    const { socketId, playerName, gameId } = req.body as gameRequest;
    
    try {
        await joinGame(playerName, socketId, gameId);
        res.status(201).json({ message: 'Player joined game successfully' });
    } catch (err) {
        console.error('Error joining game:', err);
        res.status(500).json({ message: 'Error joining game' });
    }
}