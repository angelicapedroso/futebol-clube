import { Router } from 'express';
import c from '../controllers/leaderboard.controller';

const router = Router();

router.get('/home', c.getLeaderboardHome);
router.get('/away', c.getLeaderboardAway);
router.get('/', c.getLeaderboardAll);

export default router;
