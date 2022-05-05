
import nodemailer from 'nodemailer';
import stringHelper from '../utils/stringHelper';

interface feedback {
    id: string;
    email: string;
    comment: string;
    type: string;
    screenshot?: string;
    createAt: Date;
}

export async function sendMail(to: string, subject: string, feedback: feedback) {

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "64eac8d45a6bd1",
            pass: "580c218155996a"
        }
    });

    const { createAt, type, comment, screenshot } = feedback;

    await transport.sendMail({
        from: '"Feedback Squad 👻" <feedback_squad@gmail.com>',
        to: `Fernando Carneiro <${to}>`,
        subject: subject || `New Feedback - ${stringHelper.dateTimeToString(createAt)}`,
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color:#111;">`,
            `<h1>New Feedback</h1>`,
            `<p>Date: ${stringHelper.dateTimeToString(createAt)}`,
            `<p>Feedback type: ${type}</p>`,
            `<p>Comment: ${comment}</p>`,
            `<p>Screenshot: ${screenshot}</p>`,
            `</div>`,
        ].join('\n')
    });
}