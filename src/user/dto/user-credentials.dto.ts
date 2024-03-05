import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'Password must be 8+ characters with at least one symbol.',
  })
  password: string;
}
