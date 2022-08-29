import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.getAll);
router.post('/', MatchController.create);

export default router;
