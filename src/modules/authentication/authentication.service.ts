import { Injectable } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthenticationService {
  async signIn(signInDto: SignInDto) {
    return 'Hello World!';
  }

  async signUp(signUpDto: SignUpDto) {
    return 'Hello World!';
  }
}
