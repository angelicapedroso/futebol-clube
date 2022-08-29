import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.getAll);
router.post('/', authMiddleware, MatchController.create);
router.patch('/:id/finish', MatchController.updateStatus);
router.patch('/:id', MatchController.updateGoals);

export default router;
