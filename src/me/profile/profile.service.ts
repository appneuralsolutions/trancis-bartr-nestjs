import { NewUser } from '../../auth/@interfaces/new-user.interface';
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './@dto/create-profile.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../auth/@interfaces/user.interface';

@Injectable()
export class ProfileService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async uploadPhoto(
    data: CreateProfileDto,
    userPayload: any,
    file,
  ): Promise<IUser> {
    const photoUrl = '/data/profile-pics/' + file.filename;
    data.picture = photoUrl;
    const email = userPayload.email;
    const card = await this.userModel.findOneAndUpdate({ email }, data, {
      new: true,
    });
    return new Promise((resolve) => {
      resolve(card);
    });
  }

  async findOne(userPayload): Promise<IUser> {
    console.log(userPayload);
    const email = userPayload.email;
    console.log(email);
    const user = await this.userModel.findOne({ email });
    console.log(user);
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async findProfilePic(userPayload): Promise<any> {
    const email = userPayload.email;
    const user = await this.userModel.findOne({ email });
    const profilePic = user.picture;
    return new Promise((resolve) => {
      resolve(profilePic);
    });
  }

  async update(userPayload, createProfileDto: any): Promise<IUser> {
    const email = userPayload.email;
    const user = await this.userModel.findOneAndUpdate(
      { email: email },
      { $set: createProfileDto },
      { new: true },
    );
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async remove(userPayload): Promise<IUser> {
    const email = userPayload.email;
    const user = this.userModel.findOneAndDelete({ email: email }).exec();
    return new Promise((resolve) => {
      resolve(user);
    });
  }
}
