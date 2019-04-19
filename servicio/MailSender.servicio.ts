
const nodemailer = require('nodemailer');
import {logger} from "../global/environment";
export class MailSenderServicio {

    transporter;
    mailOptions;
    constructor() {
         this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jrcotos@gmail.com',
                pass: 'Jhonkotsu789$'
            }
        });
        this.mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        }
    }

    sendEmail(to: string, subject: string){
        this.mailOptions.to = to;
        this.mailOptions.subject = subject;

        this.transporter.sendMail(this.mailOptions, function(error, info){
            if (error) {
                logger.error(error);
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}

