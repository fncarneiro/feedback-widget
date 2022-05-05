import express from 'express';
import feedbackRoute from './feedbackRoute';

interface Error {
    status?: number;
    message?: string;
}

const router = express.Router();

router.use('/feedback', feedbackRoute);


router.use((req, res, next) => {
    const error = new Error('Route not found.') as Error;
    error.status = 404;
    next(error);
});

router.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(error.status || 500);
    return res.send({
        error: error.message
    });
});

export default router;