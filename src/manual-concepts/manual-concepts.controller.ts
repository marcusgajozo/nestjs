import { Controller, Get } from '@nestjs/common';

@Controller('manual-concepts')
export class ManualConceptsController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World from manual-concepts!';
  }
}
