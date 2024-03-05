import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop()
  Title: string;

  @Prop()
  Year: number;

  @Prop()
  Runtime: number;

  @Prop()
  Genre: string;

  @Prop()
  Plot: string;

  @Prop()
  Poster: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
