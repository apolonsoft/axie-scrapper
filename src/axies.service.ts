import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import {
  RecentlyAxiesSold,
  RecentlyAxiesSoldDocument,
} from './schemas/recently-axies-sold.schema';
import { Model } from 'mongoose';

@Injectable()
export class AxiesService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(RecentlyAxiesSold.name)
    private recentlyAxiesSoldModel: Model<RecentlyAxiesSoldDocument>,
    private httpService: HttpService,
  ) {}

  async onApplicationBootstrap() {
    await this.getRecentlyAxiesSold(0, 100);
  }

  private async getRecentlyAxiesSold(from: number, size: number) {
    try {
      const query = `query GetRecentlyAxiesSold($from: Int, $size: Int) {
      settledAuctions {
        axies(from: $from, size: $size) {
        total
        results {
          id
  name
  image
  class
  breedCount
   transferHistory {
 total
 results{
  timestamp
  withPrice
  withPriceUsd
 }
          __typename
        }
  __typename
      }
      __typename
    }
    __typename
  }
}`;

      const result = await this.httpService
        .post(
          'https://axieinfinity.com/graphql-server-v2/graphql',
          JSON.stringify({
            query,
            variables: { from, size },
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      const { data } = result.data;

      const axies = data.settledAuctions.axies.results;

      for (const axie of axies) {
        const {
          id,
          name,
          class: cls,
          image,
          breedCount,
          transferHistory,
        } = axie;
        const th = transferHistory.results[0];
        const { timestamp, withPrice, withPriceUsd } = th;
        const createdAxie = new this.recentlyAxiesSoldModel({
          id,
          name,
          class: cls,
          image,
          breedCount,
          timestamp, withPrice, withPriceUsd
        });
        await createdAxie.save();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
