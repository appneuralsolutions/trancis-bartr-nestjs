import { prop } from '@typegoose/typegoose';

export class Chat {
  @prop({
    required: [true, 'Message is required'],
  })
  message: string;

  @prop({
    required: [true, 'Sender is required'],
  })
  sender: string;

  @prop({
    required: [true, 'Recipient is required'],
  })
  recipient: string;

  @prop({
    required: [true, 'Time is required'],
  })
  time: string;

  @prop({
    required: [false, 'counter offer is optional'],
  })
  counter: boolean;

  constructor(chat?: Partial<Chat>) {
    Object.assign(this, chat);
  }
}
