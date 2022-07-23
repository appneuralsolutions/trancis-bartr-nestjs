import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @ApiProperty()
  cardId: string;

  @IsNotEmpty()
  @ApiProperty()
  rightSwiped: boolean;

  userId: string;
}
