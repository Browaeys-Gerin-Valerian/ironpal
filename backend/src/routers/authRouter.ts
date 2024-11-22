import express from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../middleware/security';
import validate from '../middleware/validation/validation';
import schemas  from '../middleware/validation/schema/user'
const router = express.Router();

const postSchema = schemas.post;

/**
 * @swagger
 * /auth/user:
 *   get:
 *     tags:
 *       - authentication
 *     summary: Récupère les informations de l'utilisateur authentifié
 *     responses:
 *       200:
 *         description: Réponse réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - firstname
 *                 - lastname
 *                 - email
 *                 - password
 *                 - birthdate
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int32
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john.doe@hotmail.com
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *                   example: '1990-08-04'
 *       403:
 *         description: Token invalide
 *       500:
 *         description: Erreur interne du serveur
 */


router.get('/user', authMiddleware, authController.getLoggedUser);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - authentication
 *     summary: Authentifie un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@hotmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd!
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         headers:
 *           Set-Cookie:
 *             description: >
 *               Cookie d'authentification HTTP-only contenant le token JWT.
 *               Le cookie est sécurisé (Secure) et accessible uniquement via HTTP (HttpOnly).
 *             schema:
 *               type: string
 *               example: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9; HttpOnly; Secure; Path=/; Max-Age=3600"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - firstname
 *                 - lastname
 *                 - email
 *                 - birthdate
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int32
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john.doe@hotmail.com
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *                   example: '1990-08-04'
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur interne du serveur
 */


router.post('/login', authController.login)


/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - authentication
 *     summary: Enregistre un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - birthdate
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@hotmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd!
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: '1990-08-04'
 *     responses:
 *       201:
 *         description: Utilisateur crée avec sucès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - firstname
 *                 - lastname
 *                 - email
 *                 - birthdate
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int32
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john.doe@hotmail.com
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *                   example: '1990-08-04'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */

router.post('/register', validate(postSchema, 'body'), authController.register)

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - authentication
 *     summary: Déconnecte l'utilisateur
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       403:
 *         description: Token invalide
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/logout', authController.logout)

router.get('/stats', authMiddleware, authController.getUserStats);

router.get('/count', authController.getTotalUsers);


export default router;
