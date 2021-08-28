import { Controller, Get, Param } from '@nestjs/common';
import { AxiesService } from '../services/axies.service';

@Controller('axies')
export class AxiesController {
  constructor(private readonly axiesService: AxiesService) {}

  @Get('/list-latest')
  async listLatest() {
    return await this.axiesService.listLatest();
  }

  @Get('/list-recently-sold')
  async listRecentlySold() {
    return await this.axiesService.listRecentlySold();
  }

  @Get('/list-axies')
  async listAxies() {
    return await this.axiesService.listAxies();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (id) {
      return await this.axiesService.findOne(id);
    }
    return '';
  }
}
