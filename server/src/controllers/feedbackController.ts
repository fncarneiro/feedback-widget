import express from 'express';
import feedback from '../models/feedback';
import { check, validationResult } from 'express-validator';

const feedbackController = [
    check('comment')
        .exists()
        .withMessage('Comment is required.'),
    check('type')
        .exists()
        .withMessage('Type is required.'),
    check('email')
        .exists()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Email is not valid.'),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const feedbackJson = req.body;
        feedback.createFeedback(feedbackJson, res);
    }];

export default feedbackController;