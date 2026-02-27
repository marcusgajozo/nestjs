import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { BcryptService } from './services/bycript.service';
import { HashingService } from './services/hashing.service';
import { AuthenticationService } from './services/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from './entities/authentication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthenticationEntity])],
  controllers: [AuthenticationController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    AuthenticationService,
  ],
})
export class AuthenticationModule {}
