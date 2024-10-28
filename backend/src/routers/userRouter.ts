import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/:id', userController.getOne);

router.post('/login', userController.login)

router.post('/register', userController.register)

router.get('/logout',)

router.get('/profil/:id',)

router.put('/profil/:id',)

export default router;
