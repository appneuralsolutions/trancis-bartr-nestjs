import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './@dto/create-feedback.dto';
import { UpdateFeedbackDto } from './@dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  async create(createFeedbackDto: CreateFeedbackDto): Promise<string> {
    return new Promise((resolve) => {
      resolve('This action adds a new feedback');
    });
  }

  async findMy(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} feedback`);
    });
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
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
