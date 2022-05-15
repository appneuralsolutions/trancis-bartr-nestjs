import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  image: string;
}
