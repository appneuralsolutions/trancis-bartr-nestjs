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
    @InjectModel('Subject-Category')
    private readonly subjectCategoryModel: Model<ISubject>,
  ) {}

  async createSubject(createSubjectDto: CreateSubjectDto): Promise<ISubject> {
    const createdData = await new this.subjectModel(createSubjectDto).save();
    return new Promise((resolve) => {
      resolve(createdData);
    });
  }

  async createSubjectCategory(
    subjectId,
    createSubjectCategoryDto: any,
  ): Promise<any> {
    //ISubjectCategory
    const subjectCategory: any = await new this.subjectCategoryModel(
      createSubjectCategoryDto,
    ).save();
    const createdData = await this.subjectModel.findOneAndUpdate(
      { _id: subjectId },
      { $push: { categories: subjectCategory._id } },
      { new: true },
    );

    return new Promise((resolve) => {
      resolve(createdData);
    });
  }

  async findAll(): Promise<ISubject[]> {
    const subjects = await this.subjectModel.find();
    return new Promise((resolve) => {
      resolve(subjects);
    });
  }

  async findOne(_id: string): Promise<ISubject> {
    const subject = await this.subjectModel
      .findOne({ _id })
      .populate('categories');
    return new Promise((resolve) => {
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
    return new Promise((resolve) => {
      resolve(subject);
    });
  }

  remove(id: string) {
    return this.subjectModel.findOneAndDelete({ _id: id }).exec();
  }
}
