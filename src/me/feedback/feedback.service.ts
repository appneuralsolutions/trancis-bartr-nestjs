import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './@dto/create-feedback.dto';
import { Feedback } from '../../feedback/@interfaces/feedback.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { UpdateFeedbackDto } from './@dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
  ) {}
  async create(data: CreateFeedbackDto, userPayload): Promise<Feedback> {
    data.createdBy = userPayload.userId;
    const createdData = await new this.feedbackModel(data).save();
    return new Promise((resolve) => {
      resolve(createdData);
    });
  }

  async findMy(userPayload): Promise<Feedback[]> {
    const me = userPayload.userId;
    const data = await this.feedbackModel.find({ createdBy: me });
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  async update(
    id: string,
    data: CreateFeedbackDto,
    userPayload: any,
  ): Promise<Feedback> {
    const feedback = await this.feedbackModel.findOneAndUpdate(
      { _id: id, createdBy: userPayload.userId },
      data,
      {
        new: true,
      },
    );
    return new Promise((resolve) => {
      resolve(feedback);
    });
  }

  async remove(id: string): Promise<Feedback> {
    const feedback = await this.feedbackModel
      .findOneAndDelete({ _id: id })
      .exec();
    return new Promise((resolve) => {
      resolve(feedback);
    });
  }
}
