import { Response, Request } from 'express';
import { joinGame } from '../../controllers/join';
import { joinSchema } from '../../utils/zod';

interface gameRequest {
    socketId: string;
    name: string;
    gameId: string;
}

export const joinGameRoute = async (req: Request, res: Response) => {
    const { socketId, gameId, name} = req.body as gameRequest;
    
    const validatedData = joinSchema.safeParse({ socketId, gameId, name });

    if (!validatedData.success) {
        return res.status(400).json({ message: "Error al unirse a la sala", success: false, errors: validatedData.error.flatten().fieldErrors });
    }

    try {
        console.log(`Player ${name} with socket ID ${socketId} is attempting to join game ${gameId}`);
        await joinGame(name, socketId, gameId);
        res.status(201).json({ message: 'Player joined game successfully', gameId, success: true });
    } catch (err) {
        console.error('Error joining game:', err);
        res.status(500).json({ message: err instanceof Error ? err.message : "Error de conexión. Intenta de nuevo.", success: false });
    }
}