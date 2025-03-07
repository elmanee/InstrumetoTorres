import { Router } from 'express';
import { registerUsuario, loginUsuario } from '../controllers/usuarioControllers';

const router = Router();

router.post('/register', registerUsuario);
router.post('/login', loginUsuario);

export default router;