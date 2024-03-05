import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getAllMovies(page: number = 1, limit: number = 4): Promise<Movie[]> {
    const skip = (page - 1) * limit;

    return this.movieModel.find().skip(skip).limit(limit).exec();
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
