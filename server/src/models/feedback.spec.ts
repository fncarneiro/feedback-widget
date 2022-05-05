import express from 'express';
import feedback from "./feedback";

interface feedbackData {
    //id: string;
    email: string;
    comment: string;
    type: string;
    screenshot: string;
    createAt: Date;
}

describe('Submit Feedback', () => {
    it('should submit feedback', async () => {
        const submitFeedback: feedbackData = {
            //id: '1',
            type: 'BUG',
            comment: 'Deu ruim',
            email: 'test@test.com',
            screenshot: 'screenshot.png',
            createAt: new Date(),
        };
        const res: any = {};

        expect(await feedback.createFeedback(submitFeedback, res))
            .resolves.not.toThrow();
    });
});



