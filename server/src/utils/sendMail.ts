
import { Feedback } from '@prisma/client';
import nodemailer from 'nodemailer';
import StringHelper from '../utils/stringHelper';

export async function sendMail(to: string, subject: string, feedback: Feedback) {

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "64eac8d45a6bd1",
            pass: "580c218155996a"
        }
    });

    const { createAt, type, comment, screenshot, email } = feedback;
    const createAtFormatted = StringHelper.dateTimeToString(createAt)

    await transport.sendMail({
        from: '"Feedback Squad 👻" <feedback_squad@gmail.com>',
        to: `Fernando Carneiro <${to}>`,
        subject: subject || `New Feedback - ${createAtFormatted}`,
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color:#111;">`,
            `<h1>New Feedback</h1>`,
            `<p>Date: ${createAtFormatted}`,
            `<p>Feedback Type: ${type}</p>`,
            `<p>Comment: ${comment}</p>`,
            `<p>Email: ${email}</p>`,
            `<p>Screenshot: ${screenshot}</p>`,
            `</div>`,
        ].join('\n')
    });
};