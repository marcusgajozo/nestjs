import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { HashingService } from './hashing.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly bcryptService: HashingService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.authenticationRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.bcryptService.compare(
      password,
      user?.passwordHash || '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return;
  }

  async signUp(signUpDto: SignUpDto) {
    const partialSignUpDto = {
      email: signUpDto.email,
      passwordHash: await this.bcryptService.hash(signUpDto.password),
    };

    const partialUser = {
      name: signUpDto.name,
      phone: signUpDto.phone,
    };

    const hasEmailRecord = await this.authenticationRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (hasEmailRecord) {
      throw new ConflictException('Email already exists');
    }

    const createUser = this.userEntityRepository.create(partialUser);
    await this.userEntityRepository.save(createUser);

    await this.authenticationRepository.save({
      userId: createUser.id,
      ...partialSignUpDto,
    });

    return;
  }
}
