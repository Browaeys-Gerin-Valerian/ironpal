import Joi from "joi";


export const setSchema = {
    patchParams: Joi.object({
        setId: Joi.number().integer().min(1).required()
    }),
    patchBody: Joi.object({
        id: Joi.number().integer().min(1).optional(),
        number_of_repetitions: Joi.number().integer().optional(),
        difficulty: Joi.number().integer().min(0).optional(),
        rest_between_sets: Joi.number().integer().optional(),
    }),
};

