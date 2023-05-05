import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserCreateDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}