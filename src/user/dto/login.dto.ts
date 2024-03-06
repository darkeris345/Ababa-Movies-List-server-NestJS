import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'Password must be 8+ characters with at least one symbol.',
  })
  password: string;
}
