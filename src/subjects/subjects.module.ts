import { MongooseModule } from '@nestjs/mongoose';
import {
  SubjectCategorySchema,
  SubjectSchema,
} from './@schemas/subject.schema';
import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subject', schema: SubjectSchema },
      { name: 'Subject-Category', schema: SubjectCategorySchema },
    ]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [MongooseModule],
})
export class SubjectsModule {}
