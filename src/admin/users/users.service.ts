import { IUser } from './interfaces/user.interface';
import { SingleValidation } from './interfaces/single.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/shared/@constants/error.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('Deducted-Amount') private readonly deductedAmountModel: Model<any>,
    @InjectModel('single-validation')
    private readonly singleModel: Model<SingleValidation>,
  ) { }

  async getUser(_id) {
    return await this.userModel.findOne({ _id });
  }

  async getUsers() {
    return await this.userModel.find();
  }

  // async getUserById(_id){
  //   return await this.userModel.findOne({ _id })
  // }

  async singlevalidation(SingleValidationDto: any) {
    //console.log(SingleValidationDto.email)
    const email = await this.userModel.find({
      email: SingleValidationDto.email,
    });
    const username = await this.userModel.find({
      uname: SingleValidationDto.username,
    });
    const phone = await this.userModel.find({
      phone: SingleValidationDto.phone,
    });
    console.log(email.length);
    console.log(SingleValidationDto.username);
    console.log(username);

    if (SingleValidationDto.email) {
      if (email.length >= 1) {
        return 'Email already present';
      }
    }
    if (SingleValidationDto.username) {
      if (username.length >= 1) {
        return 'Username already present';
      }
    }

    if (SingleValidationDto.phone) {
      if (phone.length >= 1) {
        return 'Phone number already present';
      }
    } else {
      return 'All data are unique';
    }
  }
  async createUser(createUserDto: any) {
    const profile_pic = 'No Profile';
    createUserDto.picture = profile_pic;
    const newUser = await new this.userModel(createUserDto).save();
    return newUser;
  }

  async updateRole(_id: string, updateUserDto) {
    return await this.userModel.findByIdAndUpdate({ _id }, updateUserDto);
  }
  async deleteRole(_id: string) {
    return await this.userModel.findByIdAndDelete({ _id });
  }

  async addBartPoint(_id: string) {
    return await this.userModel.findOneAndUpdate(
      { _id },
      { $inc: { bartrPoints: 1 } },
    );
  }

  async deductBartPoint(_id: string, cardId: string) {
    const foundDeductedAmount = await this.deductedAmountModel.findOne({
      userId: _id,
      cardId,
    });
    if (!foundDeductedAmount) {
      await new this.deductedAmountModel({
        userId: _id,
        cardId,
        deductedAmount: 1,
      }).save();
      return await this.userModel.findOneAndUpdate(
        { _id },
        { $inc: { bartrPoints: -1 } },
      );
    } else {
      throw ErrorMessage.ALREADY_DEDUCTED_BARTR_POINT;
    }
  }

  async getBartPoint(_id: string) {
    return await this.userModel.findOne({ _id });
  }

  async lockUser() {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }

  async unlockUser() {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }

  async setHomeRoute() {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }

  async changePassword() {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }

  async sendResetRequest() {
    // return await this.userModel.findByIdAndDelete({_id: id});
  }
}
