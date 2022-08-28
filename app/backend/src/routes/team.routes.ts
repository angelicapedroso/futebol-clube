import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

router.get('/', TeamController.getAll);

export default router;
