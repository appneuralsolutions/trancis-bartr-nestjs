import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  user_Id: string;

  @ApiProperty()
  @IsNotEmpty()
  subject: string;
}
