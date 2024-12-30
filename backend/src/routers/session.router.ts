import express from 'express';
import { sessionExerciseController } from '../controllers/sessionExerciseController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import validate from '../middleware/validation/validation';
import { sessionExerciseSchema } from '../middleware/validation/schema/sessionExercise';

const router = express.Router();

router.post('/:sessionId/sessionExercises', validate(sessionExerciseSchema.postParams, "params"), validate(sessionExerciseSchema.postBody, "body"), catchErrors(sessionExerciseController.create));


router.put('/:sessionId/sessionExercises/:sessionExerciseId', validate(sessionExerciseSchema.putParams, "params"), validate(sessionExerciseSchema.putBody, "body"), catchErrors(sessionExerciseController.update));


router.delete('/:sessionId/sessionExercises/:sessionExerciseId', validate(sessionExerciseSchema.deleteParams, "params"), catchErrors(sessionExerciseController.delete));


export default router;