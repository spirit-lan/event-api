import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Email } from '../email/email';


export class EmailService {

    transporter : Mail
    constructor(){
        this.transporter  = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'webmaster@spirit-lan.com',
                pass: '#JayPr3s1d3nT!'
            }
        })
    }

    async send(email: Email){
        await this.transporter.sendMail({
            from: email.from,
            to: email.to,
            subject: email.subject,
            text: email.text,
            html: email.html
        });
    }
}