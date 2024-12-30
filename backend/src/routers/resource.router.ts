import express from 'express';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import { statController } from '../controllers/statController';

const router = express.Router();

router.get('/stats', catchErrors(statController.getAll));


export default router;

/**
 * @swagger
 * /resource/stats:
 *   get:
 *     tags:
 *       - resource
 *     summary: get applications main stats
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: integer
 *                   format: int32
 *                   example: 1500
 *                 exercises:
 *                   type: integer
 *                   format: int32
 *                   example: 220
 *                 muscleGroups:
 *                   type: integer
 *                   format: int32
 *                   example: 55
 *                 sessions:
 *                   type: integer
 *                   format: int32
 *                   example: 12300
 *                 sessionExercises:
 *                   type: integer
 *                   format: int32
 *                   example: 55000
 *       500:
 *         description: Internal Server Error
 */
