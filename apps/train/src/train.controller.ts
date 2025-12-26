import { Controller, Get } from '@nestjs/common';
import { TrainService } from './train.service';

@Controller()
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get()
  getHello(): string {
    return this.trainService.getHello();
  }
}
