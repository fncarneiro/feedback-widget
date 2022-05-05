import StringHelper from './stringHelper';

interface feedback {
    id: string;
    email: string;
    comment: string;
    type: string;
    screenshot?: string;
    createAt: Date;
}

const formatResponse = {

    feedback(feedback: feedback, request: any, msg: string) {
        const formattedCreateAt = StringHelper.dateToJsonString(feedback.createAt)
        return {
            msg: msg,
            feedback: {
                id: feedback.id,
                type: feedback.type,
                comment: feedback.comment,
                email: feedback.email,
                screenshot: feedback.screenshot || '',
                createAt: formattedCreateAt,
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