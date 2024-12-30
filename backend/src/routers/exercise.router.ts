import express from 'express';
import { exerciseController } from '../controllers/exerciseController';
import { catchErrors } from '../middleware/handlers/errorHandlers';

const router = express.Router();

router.get('/', catchErrors(exerciseController.getAll));

export default router;

/**
 * @swagger
 * /exercises:
 *   get:
 *     tags:
 *       - exercise
 *     summary: Get exercises
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     format: int32
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Push-up
 *                   description:
 *                     type: string
 *                     example: A bodyweight exercise where you lie face down on your stomach and push yourself up until your arms are fully extended.
 *       500:
 *         description: Internal Server Error
 */


