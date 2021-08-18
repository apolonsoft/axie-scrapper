import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type FigureDocument = Figure & Document;

@Schema()
export class Figure {
  @Prop()
  atlas: string;

  @Prop()
  model: string;

  @Prop()
  image: string;
}

export const FigureSchema = SchemaFactory.createForClass(Figure);
