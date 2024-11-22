import { NextFunction, Response, Request } from "express";
const Joi = require('joi');

type DataSource = "body" | "query" | "params" | "headers";

export default function validate(schema: typeof Joi.schema, dataSource: DataSource) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req[dataSource]);
            next();
        } catch (err: any) {
            if (err instanceof Joi.ValidationError) {
                // Handling a Joi validation error
                res.status(400).json({
                    message: "Validation failed",
                    details: err.details[0], 
                });
            } else {
                // Handling another error
                console.error(err);
                res.status(500).json({
                    message: "An unexpected error occurred.",
                });
            }
        }
    }
};

