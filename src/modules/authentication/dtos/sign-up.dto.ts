import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  @Length(11)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirm: string;
}
