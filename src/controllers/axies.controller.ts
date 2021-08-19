import { Controller, Get } from '@nestjs/common';
import { AxiesService } from '../services/axies.service';

@Controller('axies')
export class AxiesController {
  constructor(private readonly axiesService: AxiesService) {}

  @Get('/')
  async findAll() {
    await this.axiesService.listLatest();
  }
}
