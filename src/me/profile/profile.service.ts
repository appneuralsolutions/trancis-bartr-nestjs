import { NewUser } from './../../auth/@interfaces/new-user.interface';
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './@dto/create-profile.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './../../_old/v1/auth/interfaces/user.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('NewUser')
    private readonly NewUserModel: Model<NewUser>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async uploadPhoto(
    data: CreateProfileDto,
    userpayload,
    file,
  ): Promise<IUser> {
    
    const photoUrl = '/profile/' + file.filename;
    data.picture = photoUrl;
    const email = userpayload.email;
    const card = await this.userModel.findOneAndUpdate({email : email }, data, {
      new: true,
    });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async findOne(userPayload): Promise<IUser> {
    const email = userPayload.email;
    const user = await this.userModel.findOne({email : email });
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async update(
    userPayload,
    CreateProfileDto: CreateProfileDto,
  ): Promise<IUser> {
    const email = userPayload.email;
    const user = await this.userModel.findOneAndUpdate(
      { email : email  },
      CreateProfileDto,
      { new: true },
    );
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async remove(userPayload): Promise<IUser> {
    const email = userPayload.email;
    const user = this.userModel.findOneAndDelete({ email : email }).exec();
    return new Promise((resolve) => {
      resolve(user);
    });
  }
}
