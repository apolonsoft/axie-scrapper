import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecentlyAxiesSoldDocument = RecentlyAxiesSold & Document;

@Schema({
  timestamps: true,
  collection: 'recently_axies_sold',
})
export class RecentlyAxiesSold {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  class: string;

  @Prop()
  breedCount: number;

  @Prop()
  timestamp: number;

  @Prop()
  withPrice: string;

  @Prop()
  withPriceUsd: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RecentlyAxiesSoldSchema =
  SchemaFactory.createForClass(RecentlyAxiesSold);
