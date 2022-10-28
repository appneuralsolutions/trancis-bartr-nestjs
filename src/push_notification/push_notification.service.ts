import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from './../push-notification-google-service.json';
import { PushNotificationDTO } from './dto/push_notification.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PushNotificationService {
  constructor(private authService: AuthService) {
    console.log('constructor called()');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
    // admin
    //   .messaging()
    //   .send({
    //     notification: {
    //       title: 'note-Title',
    //       body: 'note-Body',
    //     },
    //     condition: "'all' in topics || 'android' in topics || 'ios' in topics",
    //   })
    //   .then((e) => {
    //     console.log(e);
    //   });

    // const payload = {
    //   notification: {
    //     title: 'title',
    //     body: 'body',
    //   },
    // };
    // admin
    //   .messaging()
    //   .sendToDevice(
    //     'c3E2ZYvxQB6Zdb0KKhSBoH:APA91bEhRQhDnPj_bBVOAMQLksvW7MT5Aqb4vg4WghCwxe8sW8rVMMLkxZkQDuzHMpaAieyvMEGOfBEK0b5ygWDqUzIn2ga6IgYhmS_92n6ofrErsA8Bn-Y-uakv3Eu7_OSGcHCtd2z6',
    //     payload,
    //   )
    //   .then((e) => {
    //     console.log(e);
    //   });
    // Promise.all([]);
    // admin
    //   .messaging()
    //   .send({
    //     notification: {
    //       title: '$FooCorp up 1.43% on the day',
    //       body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.',
    //     },
    //     condition: 'condition',
    //   })
    //   .then((e) => {
    //     console.log(e);
    //   });
    console.log('constructor executed()');
  }
  async send(pushnotificationDto: PushNotificationDTO) {
    let fcmToken;
    const payload = {
      notification: {
        title: pushnotificationDto.title,
        body: pushnotificationDto.body,
      },
    };

    fcmToken = pushnotificationDto.fcmToken;
    if (pushnotificationDto.userId) {
      const fcm: any = await this.authService.getFCMToken(
        pushnotificationDto.userId,
      );
      fcmToken = fcm.fcmTokens[0];
    }

    new Promise((resolve, reject) => {
      admin
        .messaging()
        .sendToDevice(fcmToken, payload)
        .then((e) => {
          resolve(e);
          console.log(e);
        });
    });
    console.log(`${this.send.name} executed with notificationpayload`);
  }
}
