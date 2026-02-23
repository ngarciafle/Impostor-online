import { Router } from 'express';
import { healthCheck} from './health';
import { createGameRoute as createGame } from './game/create';
import { joinGameRoute } from './game/join';
import { startGame } from './game/start';
import { getRoleRoute } from './game/getRole';
import { Express } from 'express';
import { Server } from 'socket.io';

const router = Router();


export function setUpRoutes(app: Express, io: Server) {
  app.get('/api/health', healthCheck);
  app.post('/api/create-game', createGame);
  app.post('/api/join-game', joinGameRoute);
  app.post('/api/start-game', (req, res) => startGame(req, res, io));
  app.get('/api/get-role', getRoleRoute);
}

export default router;