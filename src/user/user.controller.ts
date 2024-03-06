import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Movie } from 'src/movie/schemas/movie.schema';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get user favourite list
  @Get(`:_id`)
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

  @Post(`/register`)
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ success: boolean; message: string }> {
    return await this.userService.signUp(signUpDto);
  }

  @Post(`/login`)
  async login(
    @Body() loginDto: SignUpDto,
  ): Promise<{ token: string; id: string; username: string }> {
    return await this.userService.login(loginDto);
  }

  @Patch(`/:_id`)
  async addToFavouritesList(
    @Param('_id') _id: string,
    @Body('favouritesListes') favouritesListes: string,
  ): Promise<User> {
    return await this.userService.updateUser(_id, favouritesListes);
  }

  @Patch(':_id/:movieId')
  async deleteMovie(
    @Param('_id') _id: string,
    @Param('movieId') movieId: string,
  ) {
    const user = await this.userService.deleteMovie(_id, movieId);
    return user;
  }
}
