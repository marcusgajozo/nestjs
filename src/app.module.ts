import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
