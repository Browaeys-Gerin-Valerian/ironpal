import Joi from "joi";

export const authSchema = {
    postBody: Joi.object({
        email: Joi.string().email().lowercase().trim().min(5).max(255).required(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/).required(),
    }).required(),

};

