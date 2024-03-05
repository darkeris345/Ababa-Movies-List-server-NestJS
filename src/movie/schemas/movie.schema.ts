import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'movie' })
export class Movie extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  Title: string;

  @Prop({
    type: Number,
    required: true,
    trim: true,
    min: 1950,
    max: 2024,
  })
  Year: number;

  @Prop({
    type: Number,
    required: true,
    trim: true,
    min: 40,
    max: 500,
  })
  Runtime: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  Genre: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  Plot: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  Poster: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
