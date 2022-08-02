import { IsNotEmpty, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ChatDto {
    


  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  name: string;

}
