import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './@dtos/create-user.dto';
import { UpdateUserDto } from './@dtos/update-user.dto';
import { NewUser } from 'src/auth/@interfaces/new-user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { json } from 'stream/consumers';

@Injectable()
export class UsersService {
  constructor(@InjectModel('NewUser')
  private readonly NewUserModel: Model<NewUser>){}


  async create(createUserDto: CreateUserDto): Promise<NewUser> {
    const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(createUserDto.password,salt)
        const register = new this.NewUserModel(createUserDto);
        register.password = password;
        return await register.save() 
    
  }

  async findAll(): Promise<NewUser> {
    const user = await this.NewUserModel.find()
    return new Promise((resolve) => {
      resolve(user);
    });
  }
  async findOne(_id: string): Promise<NewUser> {
    const user = await this.NewUserModel.findOne({ _id })
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async update(_id: string, createUserDto: CreateUserDto): Promise<NewUser> {
    const user = await this.NewUserModel.findOneAndUpdate(
      { _id },
      createUserDto,
      { new: true },
    );
    return new Promise((resolve) => {
      resolve(`${user} updated`);
    });
  }

  async remove(id: String): Promise<NewUser> {
    const user =   this.NewUserModel.findOneAndDelete({_id:id}).exec()
    return new Promise((resolve) => {
      resolve(`${user} deleted`);
    });
  }
}
