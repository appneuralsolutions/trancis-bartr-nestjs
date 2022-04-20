import { NewUser } from './../../auth/@interfaces/new-user.interface';
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './@dto/create-profile.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('NewUser')
    private readonly NewUserModel: Model<NewUser>,
  ) {}

  async uploadPhoto(
    data: CreateProfileDto,
    userpayload,
    file,
  ): Promise<NewUser> {
    
    const photoUrl = '/profile/' + file.filename;
    data.picture = photoUrl;
    const id = userpayload._id;
    const card = await this.NewUserModel.findOneAndUpdate({_id : id }, data, {
      new: true,
    });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async findOne(userPayload): Promise<NewUser> {
    const email = userPayload.email;
    const user = await this.NewUserModel.findOne({email : email });
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async update(
    userPayload,
    CreateProfileDto: CreateProfileDto,
  ): Promise<NewUser> {
    const email = userPayload.email;
    const user = await this.NewUserModel.findOneAndUpdate(
      { email : email  },
      CreateProfileDto,
      { new: true },
    );
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async remove(userPayload): Promise<NewUser> {
    const id = userPayload._id;
    const user = this.NewUserModel.findOneAndDelete({ _id: id }).exec();
    return new Promise((resolve) => {
      resolve(user);
    });
  }
}
