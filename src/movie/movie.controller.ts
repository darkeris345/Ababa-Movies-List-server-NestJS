import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  // Get all movies
  @Get()
  @UseGuards(AuthGuard())
  async getMovies(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query(`sort`) sort: string,
    @Query(`Title`) Title: string,
  ): Promise<{ success: boolean; totalCount: number; movies: Movie[] }> {
    return await this.movieService.getAllMovies(page, limit, Title, sort);
  }

  // Get single movie
  @Get(':_id')
  @UseGuards(AuthGuard())
  async getMovie(@Param('_id') _id: string): Promise<Movie | null> {
    const movie = await this.movieService.getMovieById(_id);
    return movie;
  }

  // Post movie
  @Post()
  @UseGuards(AuthGuard())
  async postMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = await this.movieService.createMovie(createMovieDto);
    return movie;
  }

  //   Update movie
  @Patch(':_id')
  @UseGuards(AuthGuard())
  async putMovie(
    @Param('_id') _id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.movieService.updateMovie(_id, updateMovieDto);
    return movie;
  }

  //   Delete movie
  @Delete(':_id')
  @UseGuards(AuthGuard())
  deleteMovie(@Param('_id') _id: string) {
    return {
      success: true,
      message: `Movie ${_id} deleted`,
    };
  }
}
