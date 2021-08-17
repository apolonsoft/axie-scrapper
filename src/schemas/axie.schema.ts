import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AxieDocument = Axie & Document;

@Schema({
  timestamps: true,
  collection: 'axies',
})
export class Axie {
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
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AxieSchema = SchemaFactory.createForClass(Axie);
