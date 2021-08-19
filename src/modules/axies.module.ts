import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AxiesService } from '../services/axies.service';
import {
  RecentlyAxiesSold,
  RecentlyAxiesSoldSchema,
} from '../schemas/recently-axies-sold.schema';
import { HttpModule } from '@nestjs/axios';
import { Axie, AxieSchema } from '../schemas/axie.schema';
import { Stats, StatsSchema } from '../schemas/stats.schema';
import { Ability, AbilitySchema } from '../schemas/ability.schema';
import { Part, PartSchema } from '../schemas/part.schema';
import { LatestAxies, LatestAxiesSchema } from '../schemas/latest-axies.schema';
import { CronService } from '../services/cron.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 60000,
        maxRedirects: 5,
      }),
    }),
    MongooseModule.forFeature([
      { name: RecentlyAxiesSold.name, schema: RecentlyAxiesSoldSchema },
      { name: LatestAxies.name, schema: LatestAxiesSchema },
      { name: Axie.name, schema: AxieSchema },
      { name: Stats.name, schema: StatsSchema },
      { name: Part.name, schema: PartSchema },
      { name: Ability.name, schema: AbilitySchema },
    ]),
  ],
  providers: [AxiesService, CronService],
})
export class AxiesModule {}
