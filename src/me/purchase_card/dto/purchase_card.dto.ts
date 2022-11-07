import { IsNotEmpty, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PurchaseCardDto {
  @IsNotEmpty()
  @ApiProperty()
  cardId: string;
  purchaseBy: string;
}