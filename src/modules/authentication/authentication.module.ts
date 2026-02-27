import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { BcryptService } from './hashing/bycript.service';
import { HashingService } from './hashing/hashing.service';
import { AuthenticationService } from './authentication.service';
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
