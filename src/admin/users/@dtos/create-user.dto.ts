import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, IsOptional, Matches } from 'class-validator';
export class CreateUserDto {
  @IsOptional()
  @IsNotEmpty()
  firstname: string;
  
  @IsOptional()
  @IsNotEmpty()
  lastname: string;
  
  @IsOptional()
  @IsNotEmpty()
  username: string;
  
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsOptional()
  @IsNotEmpty()
  DOB: Date;

  @IsOptional()
  @IsNotEmpty()
  location: string;
  
  @IsOptional()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/, {
      message: 'password should have 1 uppercase, lowercase along special charcter and number'
  })

  @IsOptional()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  picture: string;
}
