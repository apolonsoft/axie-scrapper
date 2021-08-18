import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AbilityInterface } from '../interfaces/ability.interface';
import { AbilitySchema } from './ability.schema';

export type PartDocument = Part & Document;

@Schema()
export class Part {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  class: string;

  @Prop()
  type: string;

  @Prop()
  specialGenes: string;

  @Prop()
  stage: number;

  @Prop({ type: [AbilitySchema], default: [] })
  abilities: AbilityInterface[];
}

export const PartSchema = SchemaFactory.createForClass(Part);
