import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


//Wrapper to capture and forward errors from async functions.

export const catchErrors = (
    fn: (req: Request, res: Response, next: NextFunction) => void | Promise<void>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if the function returns a promise
        const result = fn(req, res, next);
        if (result instanceof Promise) {
            result.catch(next); // Catching Promises Errors
        }
    };
};


// Handler for not found routes.

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Page not found');
    (error as any).status = 404;
    next(error);
};


//Error collector to return uniform responses.

export const errorsCollector: ErrorRequestHandler = (error, req, res, next) => {
    const status = (error as any).status || 500;
    const message = error.message || 'An unknown error occurred';

    res.status(status).json({ error: message });
};
