import { Module } from '@nestjs/common';
import { ManualConceptsController } from './manual-concepts.controller';

@Module({
  imports: [],
  controllers: [ManualConceptsController],
  providers: [],
})
export class ManualConceptsModule {}
