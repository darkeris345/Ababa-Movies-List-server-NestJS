import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL), UserModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
