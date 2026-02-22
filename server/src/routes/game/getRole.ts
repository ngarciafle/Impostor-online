import { Response, Request } from 'express';
import { getRole } from '../../controllers/getRole';

interface gameRequest {
    gameId: string;
    name: string;
}

export const getRoleRoute = async (req: Request, res: Response) => {
    const { gameId, name } = req.body as gameRequest;

    try {
        const role = await getRole(gameId, name);
        if (!role) throw new Error('Fatal error: Role retrieval failed');
        if (!role.success) {
            res.status(404).json({ message: 'Role not found', success: false });
            return;
        }

        res.status(201).json({ message: 'Role retrieved successfully', impostor: role.impostor, leader: role.leader, success: true });
    } catch (err) {
        console.error('Error retrieving role:', err);
        res.status(500).json({ message: 'Error retrieving role', success: false });
    }
}