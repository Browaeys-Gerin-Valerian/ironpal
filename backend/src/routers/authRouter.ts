import express from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../middleware/security';
const router = express.Router();

router.get('/user', authMiddleware, authController.getLoggedUser);

router.post('/login', authController.login)

router.post('/register', authController.register)

router.get('/logout', authController.logout)


export default router;
