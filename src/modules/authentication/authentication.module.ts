import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { BcryptService } from './hashing/bycript.service';
import { HashingService } from './hashing/hashing.service';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    AuthenticationService,
  ],
})
export class AuthenticationModule {}
