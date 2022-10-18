import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from './../push-notification-google-service.json'
import { PushNotificationDTO } from './dto/push_notification.dto';

@Injectable()
export class PushNotificationService {
    constructor(){
        console.log('constructor called()');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount),
        })
        console.log('constructor executed()')
    }
    async send(pushnotificationDto: PushNotificationDTO){
        const {body, title, token} = pushnotificationDto;
        const payload = {
            notification: {
                title,
                body,
            },
        }
        Promise.all([await admin.messaging().sendToDevice(token,payload)])
        console.log(`${this.send.name} executed with notificationpayload`)
    }
}
