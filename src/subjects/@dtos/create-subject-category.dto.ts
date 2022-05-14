import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  image: string;
}
