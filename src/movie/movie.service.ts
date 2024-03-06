import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getAllMovies(
    page: number = 1,
    limit: number = 4,
    Title: string,
    sort: string,
  ): Promise<{ success: boolean; movies: Movie[]; totalCount: number }> {
    try {
      // Filter logic
      const filter: any =
        Title && Title.length >= 3
          ? { Title: { $regex: Title, $options: 'i' } }
          : {};
      // Counting documents fort pagination
      const totalCount: number = await this.movieModel.countDocuments(filter);

      // Sorting logic
      const sortingMovies: any = sort
        ? {
            [sort.split(':')[0]]: sort.split(':')[1] === 'asc' ? 1 : -1,
          }
        : { Title: 1 };

      const movies: any = await this.movieModel
        .find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortingMovies)
        .exec();

      return { success: true, movies, totalCount };
    } catch (error) {
      throw new Error(`Error fetching movies: ${error.message}`);
    }
  }

  // Get single movie
  async getMovieById(_id: string): Promise<{ success: boolean; movie: Movie }> {
    try {
      const movie = await this.movieModel.findById(_id).exec();
      if (!movie) {
        throw new Error('Movie not found');
      }
      return {
        success: true,
        movie,
      };
    } catch (error) {
      throw new Error(`Error fetching movie: ${error.message}`);
    }
  }

  // Post movie
  async createMovie(
    createMovieDto: Partial<Movie>,
  ): Promise<{ success: boolean; movie: Movie }> {
    try {
      const createdMovie: Movie = new this.movieModel(createMovieDto);
      return {
        success: true,
        movie: await createdMovie.save(),
      };
    } catch (error) {
      throw new Error(`Error creating movie: ${error.message}`);
    }
  }

  // Update movie
  async updateMovie(
    _id: string,
    updateMovieDto: Partial<Movie>,
  ): Promise<{ success: boolean; movie: Movie }> {
    try {
      const updatedMovie = await this.movieModel
        .findByIdAndUpdate(_id, updateMovieDto, { new: true })
        .exec();
      return {
        success: true,
        movie: updatedMovie,
      };
    } catch (error) {
      throw new Error(`Error updating movie: ${error.message}`);
    }
  }

  // Delete movie
  async deleteMovie(
    _id: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.movieModel.findByIdAndDelete(_id).exec();
      return {
        success: true,
        message: 'Movie deleted successfully',
      };
    } catch (error) {
      throw new Error(`Error deleting movie: ${error.message}`);
    }
  }
}
