import express from 'express';
import { muscleGroupController } from '../controllers/muscleGroupeController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
const router = express.Router();

router.get('/', catchErrors(muscleGroupController.getAll))

export default router;

/**
 * @swagger
 * /muscleGroups:
 *   get:
 *     tags:
 *       - muscleGroup
 *     summary: Get muscle groups
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
 *                     example: triceps
 *       500:
 *         description: Internal Server Error
 */
