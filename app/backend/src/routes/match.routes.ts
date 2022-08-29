import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.getAll);
router.post('/', MatchController.create);
router.patch('/:id/finish', MatchController.updateStatus);

export default router;
