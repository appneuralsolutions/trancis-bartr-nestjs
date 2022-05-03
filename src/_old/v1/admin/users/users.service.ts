import { IUser } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async getUser(_id) {
    return await this.userModel.findOne({ _id });
  } 

  async getUsers() {
    return await this.userModel.find();
  }

  // async getUserById(_id){
  //   return await this.userModel.findOne({ _id })
  // }

    async createUser(createUserDto: any) {
      const newUser = await new this.userModel(createUserDto).save();
      return newUser;
    }

  async updateRole(_id: string, updateUserDto) {
    return await this.userModel.findByIdAndUpdate({ _id }, updateUserDto);
  }
  async deleteRole(_id: string) {
    return await this.userModel.findByIdAndDelete({ _id });
  }

  

  async lockUser(_id: string) {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }

  async unlockUser(_id: string) {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }

  async setHomeRoute(_id: string) {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }

  async changePassword(_id: string) {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }

  async sendResetRequest(_id: string) {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }
}
