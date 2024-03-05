import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Movie } from 'src/movie/schemas/movie.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get user favourite list
  @Get(`:_id/favourites`)
  async getUserFavouritesList(
    @Param('_id') _id: string,
    @Query('Title') Title: string,
  ): Promise<Movie[]> {
    try {
      const filteredFavourites = await this.userService.getUserFavouritesList(
        _id,
        Title,
      );
      return filteredFavourites;
    } catch (error) {
      throw new Error(`Somethin wen wrong: ${error.message}`);
    }
  }
}
