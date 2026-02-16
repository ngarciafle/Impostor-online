import { Router } from 'express';
import { healthCheck} from './health';

const router = Router();

router.get('/health', healthCheck);

export default router;