import { Injectable, Logger } from '@nestjs/common';
import { AxiesService } from './axies.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly axiesService: AxiesService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleGetAxieLatest() {
    await this.axiesService.getAxieLatest({
      from: 0,
      size: 10,
      sort: 'PriceAsc',
      auctionType: 'Sale',
      criteria: {},
    });
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleGetRecentlyAxiesSold() {
    await this.axiesService.getRecentlyAxiesSold(0, 100);
  }
}
