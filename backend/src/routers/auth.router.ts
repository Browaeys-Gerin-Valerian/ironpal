import express from 'express';
import { authController } from '../controllers/authController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import authMiddleware from '../middleware/security';
import { authSchema } from '../middleware/validation/schema/auth';
import validate from '../middleware/validation/validation';

const router = express.Router();

router.get('/', authMiddleware, catchErrors(authController.getLoggedUser));

router.post('/login', validate(authSchema.postBody, "body"), catchErrors(authController.login));

router.get('/logout', catchErrors(authController.logout));

export default router;


/**
 * @swagger
 * /auth:
 *   get:
 *     tags:
 *       - authentication
 *     summary: Logged user informations
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
 *                   example: '1990-1208-04T14:44:58.856Z'
 *                 created_at:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-27T14:44:58.856Z'
 *                 updated_at:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-27T14:44:58.856Z'
 *       401: 
 *         description: Unauthorized
 *       403: 
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - authentication
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: secretPassword123
 *     responses:
 *       200:
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               format: cookie
 *               example: token=abc123; Path=/; HttpOnly
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
 *                 - created_at
 *                 - updated_at
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
 *                   example: '1990-1208-04T14:44:58.856Z'
 *                 created_at:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-27T14:44:58.856Z'
 *                 updated_at:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-27T14:44:58.856Z'
 *       401: 
 *         description: Unauthorized
 *       403: 
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - authentication
 *     summary: Disconnect user
 *     responses:
 *       200:
 *         description: Successful disconnection
 *       500:
 *         description: Internal server error
 */

