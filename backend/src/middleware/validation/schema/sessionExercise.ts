import Joi from "joi";

export const sessionExerciseSchema = {
    postParams: Joi.object({
        sessionId: Joi.number().integer().min(1).required(),
    }),
    postBody: Joi.object({
        load: Joi.number().integer().min(0).required(),
        rest_between_exercises: Joi.number().integer().min(0).required(),
        validated: Joi.boolean(),
        comment: Joi.string().trim().min(2).max(500).optional(),
        exercise_id: Joi.number().integer().min(1).required(),
        sets: Joi.array().items(
            Joi.object({
                number_of_repetitions: Joi.number().integer().min(1).required(),
                rest_between_sets: Joi.number().integer().min(0).required(),
                difficulty: Joi.number().integer().min(0).optional()
            })
        ).min(1)
    }),
    putParams: Joi.object({
        sessionId: Joi.number().integer().min(1).required(),
        sessionExerciseId: Joi.number().integer().min(1).required(),
    }),
    putBody: Joi.object({
        id: Joi.number().integer().min(1).optional(),
        load: Joi.number().integer().min(0).required(),
        rest_between_exercises: Joi.number().integer().min(0).required(),
        validated: Joi.boolean(),
        comment: Joi.string().trim().min(2).max(500).optional(),
        exercise_id: Joi.number().integer().min(1).required(),
        sets: Joi.array().items(
            Joi.object({
                id: Joi.number().integer().min(1).optional(),
                number_of_repetitions: Joi.number().integer().min(1).required(),
                rest_between_sets: Joi.number().integer().min(0).required(),
                difficulty: Joi.number().integer().min(0).optional(),
                session_exercise_id: Joi.number().integer().min(1).optional()
            })
        ).min(1)
    }),
    deleteParams: Joi.object({
        sessionId: Joi.number().integer().min(1).required(),
        sessionExerciseId: Joi.number().integer().min(1).required(),
    })

};

