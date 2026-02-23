import { Router } from 'express';
import { healthCheck} from './health';
import { createGameRoute as createGame } from './game/create';
import { joinGameRoute } from './game/join';
import { startGame } from './game/start';
import { getRoleRoute } from './game/getRole';

const router = Router();

router.get('/health', healthCheck);
router.post('/create-game', createGame);
router.post('/join-game', joinGameRoute);
router.post('/start-game', startGame);
router.get('/get-role', getRoleRoute);

export default router;