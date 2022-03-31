import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISubject } from './@interfaces/subject.interface';
import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './@dtos/create-subject.dto';
import { UpdateSubjectDto } from './@dtos/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel('Subject')
    private readonly subjectModel: Model<ISubject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<ISubject> {
    const createdData = await new this.subjectModel(createSubjectDto).save();
    return new Promise((resolve, reject) => {
      resolve(createdData);
    });
  }

  async findAll(): Promise<ISubject[]> {
    const subjects = await this.subjectModel.find();
    return new Promise((resolve, reject) => {
      resolve(subjects);
    });
  }

  async findOne(_id: string): Promise<ISubject> {
    const subject = await this.subjectModel.findOne({ _id });
    return new Promise((resolve, reject) => {
      resolve(subject);
    });
  }

  async update(
    _id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<ISubject> {
    const subject = await this.subjectModel.findOneAndUpdate(
      { _id },
      updateSubjectDto,
      { new: true },
    );
    return new Promise((resolve, reject) => {
      resolve(subject);
    });
  }

  remove(id: string) {
    return  this.subjectModel.findOneAndDelete({_id:id}).exec();
  }
}
