import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { BcryptService } from './services/bycript.service';
import { HashingService } from './services/hashing.service';
import { AuthenticationService } from './services/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from './entities/authentication.entity';
import { UserEntity } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationEntity, UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'secretKey'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    AuthenticationService,
    JwtStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
