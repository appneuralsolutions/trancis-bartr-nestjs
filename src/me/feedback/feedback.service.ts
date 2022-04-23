import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './@dto/create-feedback.dto';
import { Feedback } from './@entities/feedback.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { UpdateFeedbackDto } from './@dto/update-feedback.dto';

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

  async findMy(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} feedback`);
    });
  }

  async update(
    id: number,
    // updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action updates a #${id} feedback`);
    });
  }

  async remove(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action removes a #${id} feedback`);
    });
  }
}
