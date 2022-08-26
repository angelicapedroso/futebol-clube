import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/', AuthController.login);
router.get('/validate', AuthController.loginValidate);

export default router;
