import { IUser } from './interfaces/user.interface';
import { SingleValidation } from './interfaces/single.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>,
  @InjectModel('single-validation') private readonly singleModel: Model<SingleValidation>) {}

  async getUser(_id) {
    return await this.userModel.findOne({ _id });
  }

  async getUsers() {
    return await this.userModel.find();
  }

  // async getUserById(_id){
  //   return await this.userModel.findOne({ _id })
  // }
  
  async singlevalidation(SingleValidationDto: any){
    //console.log(SingleValidationDto.email)
    const email = await this.userModel.find({email: SingleValidationDto.email})
    const username = await this.userModel.find({uname: SingleValidationDto.username})
    const phone = await this.userModel.find({phone: SingleValidationDto.phone})
    console.log(email)
    if(email.length === 1){
      return "Email already present"
    }
    if(username.length === 1){
      return "Username already present"
    }
    if(phone.length === 1){
       return "Phone number already present"
    }
    else{
      return "All data are unique";
    }
    
  }
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
