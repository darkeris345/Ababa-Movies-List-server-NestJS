import { IsNotEmpty, MinLength, MaxLength, Min, Max } from 'class-validator';
export class CreateMovieDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  Title: string;

  @Min(1950)
  @Max(2024)
  @IsNotEmpty()
  Year: number;

  @IsNotEmpty()
  @Min(40)
  @Max(500)
  Runtime: number;

  @IsNotEmpty()
  Genre: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(250)
  Plot: string;

  @IsNotEmpty()
  Poster: string;
}
