import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
// import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Model } from 'mongoose';
import { Feedback } from './@interfaces/feedback.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const createdData = await new this.feedbackModel(createFeedbackDto).save();
    return new Promise((resolve) => {
      resolve(createdData);
    });
  }

  async findAll(): Promise<Feedback[]> {
    const feedback = await this.feedbackModel.find();
    return new Promise((resolve) => {
      resolve(feedback);
    });
  }

  async findOne(_id: string): Promise<Feedback> {
    const feedback = await this.feedbackModel.findOne({ _id });
    return new Promise((resolve) => {
      resolve(feedback);
    });
  }

  async update(
    _id: string,
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    const feedback = await this.feedbackModel.findOneAndUpdate(
      { _id },
      createFeedbackDto,
      { new: true },
    );
    return new Promise((resolve) => {
      resolve(feedback);
    });
  }

  remove(id: string) {
    return this.feedbackModel.findOneAndDelete({ _id: id }).exec();
  }
}
