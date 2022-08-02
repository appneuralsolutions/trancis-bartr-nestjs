import { IsNotEmpty, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateChatDto {
  createdBy: string;

  @IsNotEmpty()
  UUID: string;
  
  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  counter: boolean;
}
