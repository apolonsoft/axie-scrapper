import { Controller, Get } from '@nestjs/common';
import { AxiesService } from '../services/axies.service';

@Controller('axies')
export class AxiesController {
  constructor(private readonly axiesService: AxiesService) {}

  @Get('/list-latest')
  async listLatest() {
    await this.axiesService.listLatest();
  }

  @Get('/list-recently-sold')
  async listRecentlySold() {
    await this.axiesService.listRecentlySold();
  }

  @Get('/list-axies')
  async listAxies() {
    await this.axiesService.listAxies();
  }
}
