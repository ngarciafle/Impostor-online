import { Router } from 'express';
import { healthCheck} from './health';
import { createGameRoute as createGame } from './game/create';
import { joinGameRoute } from './game/joint';

const router = Router();

router.get('/health', healthCheck);
router.post('/create-game', createGame);
router.post('/join-game', joinGameRoute);

export default router;