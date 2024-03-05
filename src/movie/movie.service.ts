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
      const totalCount = await this.movieModel.countDocuments(filter);

      // Sorting logic
      const sortingMovies: any = sort
        ? {
            [sort.split(':')[0]]: sort.split(':')[1] === 'asc' ? 1 : -1,
          }
        : { Title: 1 };

      const movies = await this.movieModel
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

  async getMovieById(_id: string): Promise<Movie | null> {
    return this.movieModel.findById(_id).exec();
  }

  async createMovie(createMovieDto: Partial<Movie>): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  async updateMovie(
    _id: string,
    updateMovieDto: Partial<Movie>,
  ): Promise<Movie | null> {
    return this.movieModel
      .findByIdAndUpdate(_id, updateMovieDto, { new: true })
      .exec();
  }

  async deleteMovie(id: string): Promise<Movie | null> {
    return this.movieModel.findOneAndDelete({ _id: id }).exec();
  }
}
