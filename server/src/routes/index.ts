import { Router } from 'express';
import { healthCheck} from './health';
import { createGameRoute as createGame } from './game/create';

const router = Router();

router.get('/health', healthCheck);
router.post('/create-game', createGame);

export default router;