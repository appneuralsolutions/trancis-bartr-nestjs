import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as SendGrid from '@sendgrid/mail';

let config: any;

@Injectable()
export class EmailService {
  constructor() {
    SendGrid.setApiKey(
      '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',
    );
  }

  createSMTPTransport(emailCredential?) {
    const transport = {
      // service:
      //   emailCredential && emailCredential.service
      //     ? emailCredential.service
      //     : config.mail.service,
      host:
        emailCredential && emailCredential.domain
          ? emailCredential.domain
          : config.mail.host,
      port:
        emailCredential && emailCredential.port
          ? emailCredential.port
          : config.mail.port,
      secure:
        emailCredential && emailCredential.secure
          ? emailCredential.secure
          : config.mail.secure,
      auth: {
        user:
          emailCredential && emailCredential.email
            ? emailCredential.email
            : config.mail.user,
        pass:
          emailCredential && emailCredential.password
            ? emailCredential.password
            : config.mail.pass,
      },
    };
    return transport;
  }

  async sendEmail(mailInfo) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'xyz@appneural.com', // generated ethereal user
        pass: 'vrskilled', // generated ethereal password
      },
    });

    // send mail with defined transport object
    const sentMail = await transporter.sendMail(mailInfo);

    console.log('Message sent: %s', sentMail.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log(sentMail);
    if (sentMail.accepted.length === 0) {
      console.log('Email sent: ' + sentMail.response);
      return null;
    }
    return sentMail;
  }

  async sendSendGridEmail(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }
}
