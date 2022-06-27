import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
export class CreateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  DOB: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/, {
    message:
      'password should have 1 uppercase, lowercase along special charcter and number',
  })
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  picture: string;

  @IsOptional()
  userType: string;
}
