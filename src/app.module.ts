import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManualConceptsModule } from './manual-concepts/manual-concepts.module';

@Module({
  imports: [ManualConceptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
