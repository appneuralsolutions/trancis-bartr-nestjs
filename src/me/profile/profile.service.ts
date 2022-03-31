import { Injectable } from '@nestjs/common';
import { NewUser } from 'src/auth/@interfaces/new-user.interface';
import { CreateProfileDto } from './@dto/create-profile.dto';
import { UpdateProfileDto } from './@dto/update-profile.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfileService {
  constructor(@InjectModel('NewUser')
  private readonly NewUserModel: Model<NewUser>){}

  


  async uploadPhoto(data: CreateProfileDto,userpayload, file ): Promise<NewUser>{
    const createprofile = await new this.NewUserModel(CreateProfileDto);
    let photoUrl = '/card/' + file.filename;
    data.picture= photoUrl;
    let email = userpayload.email;
    data.email = email;
    let res = createprofile.save()
    return new Promise((resolve) => {
      resolve(res);
    });
}

  async findOne(_id: string): Promise<NewUser> {
    const user = await this.NewUserModel.findOne({ _id })
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async update(_id: string, CreateProfileDto: CreateProfileDto): Promise<NewUser> {
    const user = await this.NewUserModel.findOneAndUpdate(
      { _id },
      CreateProfileDto,
      { new: true },
    );
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async remove(id: String): Promise<NewUser> {
    const user =   this.NewUserModel.findOneAndDelete({_id:id}).exec()
    return new Promise((resolve) => {
      resolve(user);
    });
  }
}
