import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as nsp from 'nodemailer-smtp-transport';

import { default as config } from '../config';

@Injectable()
export class EmailService {
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
    let transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.secure, // true for 465, false for other ports
      auth: {
        user: config.mail.user, // generated ethereal user
        pass: config.mail.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let sentMail = await transporter.sendMail(mailInfo);

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
}
