import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { HashingService } from './hashing.service';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
    private readonly userService: UsersService,
    private readonly bcryptService: HashingService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const auth = await this.authenticationRepository.findOne({
      where: { email },
    });

    if (!auth) {
      return auth;
    }

    const isPasswordValid = await this.bcryptService.compare(
      password,
      auth.passwordHash,
    );

    if (!isPasswordValid) {
      return null;
    }

    const payload = { email: auth.email, sub: auth.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const partialSignUpDto = {
      email: signUpDto.email,
      passwordHash: await this.bcryptService.hash(signUpDto.password),
    };

    const partialUser: CreateUserDto = {
      name: signUpDto.name,
      phone: signUpDto.phone,
    };

    const hasEmailRecord = await this.authenticationRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (hasEmailRecord) {
      return null;
    }

    const createUser = await this.userService.create(partialUser);

    return await this.authenticationRepository.save({
      userId: createUser.id,
      ...partialSignUpDto,
    });
  }
}
