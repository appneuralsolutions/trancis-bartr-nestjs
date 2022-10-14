import { Injectable } from '@nestjs/common';
import { PurchaseFeedback } from './interface/purchase_feedback.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { PurchaseFeedbackDto } from './dto/purchase_feedback.dto';

@Injectable()
export class PurchaseFeedbackService {
    constructor(
        @InjectModel('PurchaseFeedback') private readonly feedbackModel: Model<PurchaseFeedback>,
    ) { }
    async create(data: PurchaseFeedbackDto, userPayload): Promise<PurchaseFeedback> {
        data.createdBy = userPayload.userId;
        const createdData = await new this.feedbackModel(data).save();
        return new Promise((resolve) => {
            resolve(createdData);
        });
    }
    async findAll(): Promise<PurchaseFeedback[]> {
        const feedback = await this.feedbackModel.find();
        return new Promise((resolve) => {
            resolve(feedback);
        });
    }
    async findMy(userPayload): Promise<PurchaseFeedback[]> {
        const me = userPayload.userId;
        const data = await this.feedbackModel.find({ createdBy: me });
        return new Promise((resolve) => {
            resolve(data);
        });
    }

    async update(
        id: string,
        data: PurchaseFeedbackDto,
        userPayload: any,
    ): Promise<PurchaseFeedback> {
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

    async remove(id: string): Promise<PurchaseFeedback> {
        const feedback = await this.feedbackModel
            .findOneAndDelete({ _id: id })
            .exec();
        return new Promise((resolve) => {
            resolve(feedback);
        });
    }
}
