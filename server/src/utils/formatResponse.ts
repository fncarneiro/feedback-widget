import { Feedback } from '@prisma/client';
import StringHelper from './stringHelper';

export interface IFormatRequest {
    type: string;
    description: string;
    url?: string;
}

const formatResponse = {
    feedback(feedback: Feedback, request: IFormatRequest, msg: string) {
        const createAtFormatted = StringHelper.dateTimeToString(feedback.createAt)
        return {
            msg: msg,
            feedback: {
                id: feedback.id,
                type: feedback.type,
                comment: feedback.comment,
                email: feedback.email,
                screenshot: feedback.screenshot || '',
                createAt: createAtFormatted,
                request: {
                    type: request.type,
                    description: request.description,
                    url: process.env.HOST + ':' + process.env.PORT + '/api/feedback/' + feedback.id,
                }
            }
        }
    },
};

export default formatResponse;