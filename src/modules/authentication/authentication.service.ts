import { Injectable } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationEntity } from './entities/authentication.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
  ) {}

  async signIn(signInDto: SignInDto) {
    return 'Hello World!';
  }

  async signUp(signUpDto: SignUpDto) {
    return 'Hello World!';
  }
}
