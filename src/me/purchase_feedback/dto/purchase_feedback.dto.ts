import { IsNotEmpty, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PurchaseFeedbackDto {
  @IsNotEmpty()
  @ApiProperty()
  cardId: string;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @Max(5)
  @IsNotEmpty()
  rating: number;
}