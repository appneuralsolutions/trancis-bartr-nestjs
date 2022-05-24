import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @ApiProperty()
  cardId: string;

  @IsNotEmpty()
  @ApiProperty()
  like: boolean;

  userId: string;
}
