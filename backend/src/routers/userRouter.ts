import express from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/security';
const router = express.Router();

router.get('/', authMiddleware, userController.getLoggedUser);

router.post('/login', userController.login)

router.post('/register', userController.register)

router.get('/logout', userController.logout)

router.get('/profil/:id',)

router.put('/profil/:id',)

export default router;
