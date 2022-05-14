import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  image: string;
}
