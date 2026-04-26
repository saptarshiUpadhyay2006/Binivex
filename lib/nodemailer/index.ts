import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE, LOGIN_ALERT_EMAIL_TEMPLATE } from './templates';

export const transporter=nodemailer.createTransport(
    {
        service:'gmail',
        auth: {
            user:process.env.NODEMAILER_EMAIL,
            pass:process.env.NODEMAILER_PASSWORD,
        },
    }
)


export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Binivex" <Binivex@email.pro>`,
        to: email,
        subject: `Welcome to Binivex - your stock market toolkit is ready!`,
        text: 'Thanks for joining Binivex',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
};

export const sendLoginAlertEmail = async ({ email, name, timestamp }: { email: string; name: string; timestamp: string }) => {
    const htmlTemplate = LOGIN_ALERT_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{email}}', email)
        .replace('{{timestamp}}', timestamp);

    const mailOptions = {
        from: `"Binivex Security" <Binivex@email.pro>`,
        to: email,
        subject: `Security Alert: New Login Detected`,
        text: `A new login was detected on your Binivex account.`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"Binivex News" <Binivex@email.pro>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Binivex`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};