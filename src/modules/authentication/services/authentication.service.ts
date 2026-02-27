import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { HashingService } from './hashing.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
    private readonly bcryptService: HashingService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.authenticationRepository.findOne({
      where: { email },
    });

    const isPasswordValid = await this.bcryptService.compare(
      password,
      user?.passwordHash || '',
    );

    if (!user || !isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return;
  }

  async signUp(signUpDto: SignUpDto) {
    return 'Hello World!';
  }
}
