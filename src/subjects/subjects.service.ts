import { ErrorMessage } from 'src/shared/@constants/error.constant';
import { ISubjectCategory } from './@interfaces/subject-category.interface';
import { CreateSubjectCategoryDto } from './@dtos/create-subject-category.dto';
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
    createSubjectCategoryDto: CreateSubjectCategoryDto,
  ): Promise<ISubjectCategory> {
    //ISubjectCategory
    const subjectCategory: any = await new this.subjectCategoryModel({
      ...createSubjectCategoryDto,
      subjectId,
    }).save();
    await this.subjectModel.findOneAndUpdate(
      { _id: subjectId },
      { $push: { categories: subjectCategory._id } },
      { new: true },
    );

    return new Promise((resolve) => {
      resolve(subjectCategory);
    });
  }

  async uploadSubjectCategoryPhoto(
    subjectId: string,
    data: CreateSubjectCategoryDto,
    files,
  ): Promise<any> {
    if (files && files.length > 0) {
      const photoUrl = '/data/subject-categories/' + files[0].filename;
      data.image = photoUrl;
      const updatedInDB = await this.createSubjectCategory(subjectId, data);
      return new Promise((resolve) => {
        resolve(updatedInDB);
      });
    } else {
      throw ErrorMessage.UPLOAD_FILE;
    }
  }

  async findAll(): Promise<ISubject[]> {
    const subjects = await this.subjectModel.find().populate({
      path: 'categories',
      populate: {
        path: 'subjectId',
      },
    });

    return new Promise((resolve) => {
      resolve(subjects);
    });
  }

  async findOne(_id: string): Promise<ISubject> {
    const subject = await this.subjectModel.findOne({ _id }).populate({
      path: 'categories',
      populate: {
        path: 'subjectId',
      },
    });
    return new Promise((resolve) => {
      resolve(subject);
    });
  }

  async findOneCategory(_id: string): Promise<any> {
    const subjectCategory = await this.subjectCategoryModel.findOne({ _id });
    return new Promise((resolve) => {
      resolve(subjectCategory);
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

  udpateCategory(cid, data) {
    return this.subjectCategoryModel
      .findOneAndUpdate({ _id: cid }, { $set: data })
      .exec();
  }

  remove(id: string) {
    return this.subjectModel.findOneAndDelete({ _id: id }).exec();
  }

  deleteCategory(id, cid) {
    this.subjectModel
      .findOneAndUpdate({ _id: id }, { $pull: { categories: cid } })
      .exec();
    return this.subjectCategoryModel.findOneAndDelete({ _id: cid }).exec();
  }
}
