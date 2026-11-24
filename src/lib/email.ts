import nodemailer from "nodemailer";

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
});


export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to send email", error);
        return { success: false };
    }

};