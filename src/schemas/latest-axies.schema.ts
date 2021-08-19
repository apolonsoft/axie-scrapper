import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatsSchema } from './stats.schema';
import { StatsInterface } from '../interfaces/stat-interface';
import { PartSchema } from './part.schema';
import { PartInterface } from '../interfaces/part-interface';

export type LatestAxiesDocument = LatestAxies & Document;

@Schema({
  timestamps: true,
  collection: 'latest_axies',
})
export class LatestAxies {
  @Prop()
  id: string;

  @Prop()
  image: string;

  @Prop()
  class: string;

  @Prop()
  name: string;

  @Prop()
  genes: string;

  @Prop()
  owner: string;

  @Prop()
  stage: number;

  @Prop()
  title: string;

  @Prop()
  breedCount: number;

  @Prop()
  level: number;

  @Prop({ type: StatsSchema })
  stats: StatsInterface;

  @Prop({ type: [PartSchema], default: [] })
  parts: PartInterface[];

  @Prop({ type: Object })
  auction: Record<string, unknown>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LatestAxiesSchema = SchemaFactory.createForClass(LatestAxies);
