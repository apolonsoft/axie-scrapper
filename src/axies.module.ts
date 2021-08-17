import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AxiesService } from './axies.service';
import {
  RecentlyAxiesSold,
  RecentlyAxiesSoldSchema,
} from './schemas/recently-axies-sold.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 15000,
        maxRedirects: 5,
      }),
    }),
    MongooseModule.forFeature([
      { name: RecentlyAxiesSold.name, schema: RecentlyAxiesSoldSchema },
    ]),
  ],
  providers: [AxiesService],
})
export class AxiesModule {}
