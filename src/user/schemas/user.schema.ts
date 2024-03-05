import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Movie } from 'src/movie/schemas/movie.schema';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }])
  favouritesListes: Movie[];

  @Prop({ default: 'user', enum: ['admin', 'user'] })
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
