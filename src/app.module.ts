import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(DATABASE_URL),
    UserModule,
    MovieModule,
  ],
})
export class AppModule {}
