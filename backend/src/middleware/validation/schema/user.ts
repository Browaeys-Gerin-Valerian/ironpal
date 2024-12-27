import coreJoi from "joi";
import joiDate from "@joi/date";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const userSchema = {
    getOneParams: Joi.object({
        userId: Joi.number().integer().min(1).required()
    }),
    postBody: Joi.object({
        firstname: Joi.string().trim().min(2).max(50).required(),
        lastname: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().trim().min(5).max(255).required(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/).required(),
        birthdate: Joi.date().iso().format('YYYY-MM-DD').raw().optional()
    }).required(),
    patchParams: Joi.object({
        userId: Joi.number().integer().min(1).required()
    }),
    patchBody: Joi.object({
        id: Joi.number().integer().min(1).optional(),
        firstname: Joi.string().trim().min(2).max(50).optional(),
        lastname: Joi.string().trim().min(2).max(50).optional(),
        email: Joi.string().email().lowercase().trim().min(5).max(255).optional(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/).optional(),
        birthdate: Joi.date().iso().format('YYYY-MM-DD').raw().optional()
    }),
};


