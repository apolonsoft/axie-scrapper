import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type StatsDocument = Stats & Document;

@Schema()
export class Stats {
  @Prop()
  hp: number;

  @Prop()
  speed: number;

  @Prop()
  skill: number;

  @Prop()
  morale: number;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
