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
    @Query(`sort`) sort: string,
    @Query(`Title`) Title: string,
  ): Promise<{ success: boolean; totalCount: number; movies: Movie[] }> {
    return await this.movieService.getAllMovies(page, limit, Title, sort);
  }

  // Get single movie
  @Get(':id')
  async getMovie(
    @Param('id') id: string,
  ): Promise<{ success: boolean; movie: Movie }> {
    const movie = await this.movieService.getMovieById(id);
    return movie;
  }

  // Post movie
  @Post()
  async postMovie(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<{ success: boolean; movie: Movie }> {
    const movie = await this.movieService.createMovie(createMovieDto);
    return movie;
  }

  //   Update movie
  @Patch(':id')
  async putMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<{ success: boolean; movie: Movie }> {
    const movie = await this.movieService.updateMovie(id, updateMovieDto);
    return movie;
  }

  //   Delete movie
  @Delete(':id')
  async deleteMovie(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    const result = await this.movieService.deleteMovie(id);
    return result;
  }
}
