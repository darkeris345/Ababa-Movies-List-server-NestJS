import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'Password must be 8+ characters with at least one symbol.',
  })
  password: string;
}
