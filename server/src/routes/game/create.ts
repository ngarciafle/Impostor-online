import { Response, Request } from 'express';
import { createGame } from '../../controllers/create';
import { createSchema } from '../../utils/zod';

interface gameRequest {
    socketId: string;
    name: string;
}

export const createGameRoute = async (req: Request, res: Response) => {
    const { socketId, name } = req.body as gameRequest;

    const validatedData = createSchema.safeParse({ name });

    if (!validatedData.success) {
        return res.status(400).json({ message: "Error datos", success: false, errors: validatedData.error.flatten().fieldErrors });
    }
    try {
        const gameId = await createGame(name, socketId);
        res.status(201).json({ message: 'Game created successfully', gameId, success: true });
    } catch (err) {
        console.error('Error creating game:', err);
        res.status(500).json({ message: 'Error creating game', success: false });
    }
}