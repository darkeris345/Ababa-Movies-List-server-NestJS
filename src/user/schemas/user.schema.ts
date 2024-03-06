import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Movie } from 'src/movie/schemas/movie.schema';

@Schema({ collection: 'user' })
export class User extends Document {
  @Prop({
    unique: true,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 40,
  })
  username: string;

  @Prop({
    required: true,
    trim: true,
    select: false,
    minlength: 8,
    match: /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[a-zA-Z]).{8,}$/,
  })
  password: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }])
  favouritesListes: Movie[];

  @Prop({ default: 'user', enum: ['admin', 'user'] })
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
