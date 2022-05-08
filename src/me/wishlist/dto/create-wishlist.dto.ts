import { IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  like: boolean;

  @IsNotEmpty()
  email: string;
}
