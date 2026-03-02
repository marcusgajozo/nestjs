import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';

export class SignUpDto extends CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirm: string;
}
