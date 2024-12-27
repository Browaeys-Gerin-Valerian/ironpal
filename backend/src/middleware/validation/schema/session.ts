
import coreJoi from "joi";
import joiDate from "@joi/date";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const sessionSchema = {
    getParams: Joi.object({
        userId: Joi.number().integer().min(1).required(),
    }),
    getQuery: Joi.object({
        month: Joi.number().integer().min(0).max(11),
        year: Joi.number().integer().min(1900).max(2100)
    }),

    getOneParams: Joi.object({
        userId: Joi.number().integer().min(1).required(),
        sessionId: Joi.number().integer().min(1).required()
    }),

    postParams: Joi.object({
        userId: Joi.number().integer().min(1).required(),
    }),

    post: Joi.object({
        title: Joi.string().trim().min(2).max(100).required(),
        session_date: Joi.date().iso().format('YYYY-MM-DD').raw().required()
    }),

    deleteParams: Joi.object({
        userId: Joi.number().integer().min(1).required(),
        sessionId: Joi.number().integer().min(1).required()
    })
}