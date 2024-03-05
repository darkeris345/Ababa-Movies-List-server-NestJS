import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  // Get all movies
  @Get()
  async getMovies(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Movie[]> {
    const movies = await this.movieService.getAllMovies(page, limit);
    return movies;
  }

  // Get single movie
  @Get(':_id')
  async getMovie(@Param('_id') _id: string): Promise<Movie | null> {
    const movie = await this.movieService.getMovieById(_id);
    return movie;
  }

  //   Post movie
  @Post()
  async postMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = await this.movieService.createMovie(createMovieDto);
    return movie;
  }

  //   Update movie
  @Patch(':id')
  async putMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.movieService.updateMovie(id, updateMovieDto);
    return movie;
  }

  //   Delete movie
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return {
      id,
    };
  }
}
