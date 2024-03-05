import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Movie } from 'src/movie/schemas/movie.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  //   Get user favourite list
  async getUserFavouritesList(
    userId: string,
    Title: string,
  ): Promise<Movie[] | null> {
    const userFavourites = await this.userModel
      .findById(userId)
      .populate('favouritesListes', '-__v');

    if (!userFavourites) {
      throw new NotFoundException('User not found');
    }

    const filteredFavourites =
      Title && Title.length > 3
        ? userFavourites.favouritesListes.filter((movie) =>
            movie.Title.toLowerCase().includes(Title.toLowerCase()),
          )
        : userFavourites.favouritesListes;

    return filteredFavourites;
  }
}
