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

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly bcryptService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const auth = await this.authenticationRepository.findOne({
      where: { email },
    });

    if (!auth) {
      throw new UnauthorizedException(
        this.i18n.translate('validation.UNAUTHORIZED'),
      );
    }

    const isPasswordValid = await this.bcryptService.compare(
      password,
      auth?.passwordHash || '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        this.i18n.translate('validation.UNAUTHORIZED'),
      );
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

    const partialUser = {
      name: signUpDto.name,
      phone: signUpDto.phone,
    };

    const hasEmailRecord = await this.authenticationRepository.findOne({
      where: { email: signUpDto.email },
    });

    if (hasEmailRecord) {
      throw new ConflictException(
        this.i18n.translate('validation.EMAIL_EXISTS'),
      );
    }

    const createUser = this.userEntityRepository.create(partialUser);
    await this.userEntityRepository.save(createUser);

    await this.authenticationRepository.save({
      userId: createUser.id,
      ...partialSignUpDto,
    });

    return {
      message: 'User created successfully',
    };
  }
}
