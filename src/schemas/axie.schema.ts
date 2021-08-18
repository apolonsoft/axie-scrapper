import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatsSchema } from './stats.schema';
import { StatsInterface } from '../interfaces/stat-interface';
import { PartSchema } from './part.schema';
import { PartInterface } from '../interfaces/part-interface';

export type AxieDocument = Axie & Document;

@Schema({
  timestamps: true,
  collection: 'axies',
})
export class Axie {
  @Prop()
  id: string;

  @Prop()
  image: string;

  @Prop()
  class: string;

  @Prop()
  genes: string;

  @Prop({ type: StatsSchema })
  stats: StatsInterface;

  @Prop({ type: [PartSchema], default: [] })
  parts: PartInterface[];

  @Prop()
  genQuantity: number;

  @Prop({ type: Object })
  allGenes: Record<string, unknown>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AxieSchema = SchemaFactory.createForClass(Axie);
