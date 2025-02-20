import express from 'express';
import authMiddleware from '../middleware/security';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import { userController } from '../controllers/userContoller';
import validate from '../middleware/validation/validation';
import { userSchema } from '../middleware/validation/schema/user';
import { sessionSchema } from '../middleware/validation/schema/session';
import { sessionController } from '../controllers/sessionController';


const router = express.Router();

router.get('/:userId/stats', authMiddleware, validate(userSchema.getOneParams, 'params'), catchErrors(userController.getStats));

router.get('/:userId', validate(userSchema.getOneParams, 'params'), catchErrors(userController.getOne));

router.post('/', validate(userSchema.postBody, 'body'), catchErrors(userController.create));

router.patch('/:userId', authMiddleware, validate(userSchema.patchParams, 'params'), validate(userSchema.patchBody, 'body'), catchErrors(userController.update));

router.get('/:userId/sessions', authMiddleware, validate(sessionSchema.getParams, 'params'), validate(sessionSchema.getQuery, 'query'), catchErrors(sessionController.getAll));

router.get('/:userId/sessions/:sessionId', authMiddleware, validate(sessionSchema.getOneParams, 'params'), catchErrors(sessionController.getOne));

router.post('/:userId/sessions', authMiddleware, validate(sessionSchema.post, 'body'), catchErrors(sessionController.create));

router.delete('/:userId/sessions/:sessionId', authMiddleware, validate(sessionSchema.deleteParams, 'params'), catchErrors(sessionController.delete));


export default router;


/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - user
 *     summary: get user details by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *           format: int32
 *           required: true
 *     responses:
 *       200:
 *         description: User details updated successfully
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
 *                   example: Updated Name
 *                 lastname:
 *                   type: string
 *                   example: Updated Lastname
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: updated.email@example.com
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *                   example: '1990-1208-04T14:44:58.856Z'
 *                 created_at:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-27T14:44:58.856Z'
 *                 updated_at:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-27T14:44:58.856Z'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - user
 *     summary: Create a new user
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
 *                 example: '1990-1208-04T14:44:58.856Z'
 *     responses:
 *       201:
 *         description: user created sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
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
 *       400:
 *         description: invalid request body
 *       409:
 *         description: user already exist
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     tags:
 *       - user
 *     summary: Update user details by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *           format: int32
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Updated Name
 *               lastname:
 *                 type: string
 *                 example: Updated Lastname
 *               email:
 *                 type: string
 *                 format: email
 *                 example: updated.email@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123!
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: '1990-08-04'
 *     responses:
 *       200:
 *         description: User details updated successfully
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
 *       400:
 *         description: invalid request body
 *       409:
 *         description: user already exist
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /users/{userId}/sessions:
 *   get:
 *     tags:
 *       - session
 *     summary: Get all sessions for a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *           format: int32
 *         required: true
 *     queryParameters:
 *       - name: startDate
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         example: '2023-01-01'
 *       - name: endDate
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         example: '2023-12-31'
 *     responses:
 *       200:
 *         description: Sessions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - id
 *                   - title
 *                   - session_date
 *                   - validated
 *                   - created_at
 *                   - updated_at
 *                 properties:
 *                   id:
 *                     type: integer
 *                     format: int32
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Workout Session 1
 *                   session_date:
 *                     type: string
 *                     format: date
 *                     example: '2023-07-15'
 *                   validated:
 *                     type: boolean
 *                     example: true
 *                   created_at:
 *                     type: string
 *                     format: date
 *                     example: '2023-07-15T10:00:00.000Z'
 *                   updated_at:
 *                     type: string
 *                     format: date
 *                     example: '2023-07-15T11:30:00.000Z'
 *       400:
 *         description: missing query parameter
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{userId}/sessions/{sessionId}:
 *   get:
 *     tags:
 *       - session
 *     summary: Get a specific session by ID for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *           format: int32
 *         required: true
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: integer
 *           format: int32
 *         required: true
 *     responses:
 *       200:
 *         description: Session details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - title
 *                 - session_date
 *                 - created_at
 *                 - updated_at
 *                 - user_id
 *                 - session_exercises
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int32
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Workout Session 1
 *                 session_date:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-15'
 *                 created_at:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-15T10:00:00.000Z'
 *                 updated_at:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-15T11:30:00.000Z'
 *                 user_id:
 *                   type: integer
 *                   format: int32
 *                   example: 1
 *                 session_exercises:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         format: int32
 *                         example: 1
 *                       load:
 *                         type: number
 *                         example: 20
 *                       rest_between_exercises:
 *                         type: integer
 *                         example: 60
 *                       validated:
 *                         type: boolean
 *                         example: true
 *                       comment:
 *                         type: string
 *                         nullable: true
 *                         example: 'Great form today!'
 *                       sets: 
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               format: int32
 *                               example: 1
 *                             number_of_repetitions:
 *                               type: number
 *                               example: 20
 *                             difficulty:
 *                               type: integer
 *                               example: 3
 *                             rest_between_sets:
 *                               type: number
 *                               example: 80
 *                             sessionèexercise_id:
 *                               type: integer
 *                               format: int32
 *                               example: 5
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /users/{userId}/sessions:
 *   post:
 *     tags:
 *       - session
 *     summary: Get all sessions for a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *           format: int32
 *         required: true
 *     responses:
 *       200:
 *         description: Session retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - title
 *                 - session_date
 *                 - validated
 *                 - created_at
 *                 - updated_at
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int32
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Workout Session 1
 *                 session_date:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-15'
 *                 validated:
 *                   type: boolean
 *                   example: true
 *                 created_at:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-15T10:00:00.000Z'
 *                 updated_at:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-15T11:30:00.000Z'
 *       400:
 *         description: missing query parameter
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{userId}/sessions/{sessionId}:
 *   delete:
 *     tags:
 *       - session
 *     summary: Get all sessions for a user by ID
  *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *           format: int32
 *         required: true
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: integer
 *           format: int32
 *         required: true
 *     responses:
 *       200:
 *         description: Session successfully ddeleted
 *       400:
 *         description: missing query parameter
 *       500:
 *         description: Internal Server Error
 */



