import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AbilityDocument = Ability & Document;

@Schema()
export class Ability {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  attack: number;

  @Prop()
  defense: number;

  @Prop()
  energy: number;

  @Prop()
  description: string;

  @Prop()
  backgroundUrl: string;

  @Prop()
  effectIconUrl: string;
}

export const AbilitySchema = SchemaFactory.createForClass(Ability);
