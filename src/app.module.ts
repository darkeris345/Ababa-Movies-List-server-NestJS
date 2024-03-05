import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import * as dotenv from 'dotenv';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL), UserModule, MovieModule],
  controllers: [UserController, MovieController],
  providers: [UserService, MovieService],
})
export class AppModule {}
