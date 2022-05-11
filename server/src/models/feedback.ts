import { feedbackCreated } from '../utils/messages';
import connection from '../database/connection';
import formatResponse, { IFormatRequest } from '../utils/formatResponse';
import { sendMail } from "../utils/sendMail";
import { Feedback } from '@prisma/client';
import express from 'express';

const feedback = {
    async createFeedback(feedback: Feedback, res: express.Response) {
        try {
            const { comment, type, screenshot, email } = feedback;
            const resultInsert = await connection.feedback.create({
                data: {
                    type: type,
                    comment: comment,
                    screenshot: screenshot,
                    email: email,
                },
            });

            const feedbackResponse = { ...resultInsert };
            const request: IFormatRequest = { type: 'POST', description: 'Insert a feedback.' };
            const response = formatResponse.feedback(feedbackResponse, request, feedbackCreated);

            const mail = { to: 'fncarneiro@gmail.com', subject: 'New Feedback', feedback: feedbackResponse };

            await sendMail(mail.to, mail.subject, mail.feedback);

            return res.status(201).json(response);
        }

        catch (error) {
            return res.status(400).json(error)
        }
    }
}

export default feedback;