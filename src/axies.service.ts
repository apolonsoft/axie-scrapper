import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import {
  RecentlyAxiesSold,
  RecentlyAxiesSoldDocument,
} from './schemas/recently-axies-sold.schema';
import { Model } from 'mongoose';
import { AxieGene } from 'agp-npm/dist/axie-gene';
import { Axie, AxieDocument } from './schemas/axie.schema';

@Injectable()
export class AxiesService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(RecentlyAxiesSold.name)
    private recentlyAxiesSoldModel: Model<RecentlyAxiesSoldDocument>,
    @InjectModel(Axie.name)
    private axieModel: Model<AxieDocument>,
    private httpService: HttpService,
  ) {}

  async onApplicationBootstrap() {
    //await this.getRecentlyAxiesSold(0, 100);
    await this.getAxieDetail('1621247');
  }

  private async getAxieDetail(axieId: string) {
    try {
      const query = `query GetAxieDetail($axieId: ID!) {
  axie(axieId: $axieId) {
    id
  image
  class
  chain
  name
  genes
  owner
  birthDate
  bodyShape
  sireId
  sireClass
  matronId
  matronClass
  stage
  title
  breedCount
  level
  figure {
    atlas
    model
    image
    __typename
  }

 stats {
    hp
  speed
  skill
  morale
    __typename
  }
  auction {
    startingPrice
  endingPrice
  startingTimestamp
  endingTimestamp
  duration
  timeLeft
  currentPrice
  currentPriceUSD
  suggestedPrice
  seller
  listingIndex
  state
    __typename
  }
  ownerProfile {
    name
    __typename
  }
  battleInfo {
    banned
  banUntil
  level
    __typename
  }
  children {
    id
    name
    class
    image
    title
    stage
    __typename
  }
   parts {
     id
  name
  class
  type
  specialGenes
  stage
  abilities {
    id
  name
  attack
  defense
  energy
  description
  backgroundUrl
  effectIconUrl
  __typename
  }
  __typename
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
            variables: { axieId },
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();
      const { data } = result.data;
      const { axie } = data;
      const { genes, stats, parts, class: cls } = axie;
      const axieGene = new AxieGene(genes);
      const genQuantity = axieGene.getGeneQuality();
      const allGenes = axieGene.genes;
      const createdAxie = new this.axieModel({
        class: cls,
        stats,
        parts,
        allGenes,
        genQuantity,
      });
      await createdAxie.save();
    } catch (error) {
      console.log(error);
    }
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
          timestamp,
          withPrice,
          withPriceUsd,
        });
        await createdAxie.save();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
