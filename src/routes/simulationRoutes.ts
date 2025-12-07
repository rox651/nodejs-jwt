import { Router } from 'express';
import { runSimulation } from '../controllers/simulationController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.post('/', runSimulation);

export default router;

