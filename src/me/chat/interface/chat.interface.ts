import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

export interface Chat {
  roomId: string;
  message: string;
  sentTo: string;
  sentBy: string;
  counter: string;
  amount: string;
  messagingPayload: MessagingPayload;
}
