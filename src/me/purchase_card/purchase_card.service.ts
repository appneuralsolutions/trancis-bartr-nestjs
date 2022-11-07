import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { PurchaseCard } from './interface/purchase_card.interface';
import { PurchaseCardDto } from './dto/purchase_card.dto';
import { CreateCard } from 'src/cards/@interface/card.interface';

@Injectable()
export class PurchaseCardService {
    constructor(
        @InjectModel('Card') private cardModel: Model<CreateCard>,
        @InjectModel('PurchaseCard') private readonly PurchaseCard: Model<PurchaseCard>,
    ) { }
    async create(data: PurchaseCardDto, userPayload): Promise<PurchaseCard> {
        data.purchaseBy = userPayload.userId;
        const createdData = await new this.PurchaseCard(data).save();
        if(createdData){
        await this.cardModel.findOneAndUpdate(
            { _id: data.cardId },
            { $set: {purchase: true} },
            {
              new: true,
            },
          );
        }
        return new Promise((resolve) => {
            resolve(createdData);
        });
    }
    async findAll(): Promise<PurchaseCard[]> {
        const feedback = await this.PurchaseCard.find({"purchaseBy":0}).populate('cardId');
        return new Promise((resolve) => {
            resolve(feedback);
        });
    }
    async findMy(userPayload): Promise<PurchaseCard[]> {
        const me = userPayload.userId;
        const data = await this.PurchaseCard.find({ createdBy: me },{"purchaseBy":0}).populate('cardId');
        return new Promise((resolve) => {
            resolve(data);
        });
    }

    async update(
        id: string,
        data: PurchaseCardDto,
        userPayload: any,
    ): Promise<PurchaseCard> {
        const feedback = await this.PurchaseCard.findOneAndUpdate(
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

    async remove(id: string): Promise<PurchaseCard> {
        const feedback = await this.PurchaseCard
            .findOneAndDelete({ _id: id })
            .exec();
        return new Promise((resolve) => {
            resolve(feedback);
        });
    }
}
