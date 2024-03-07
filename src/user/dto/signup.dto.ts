import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEnum,
} from 'class-validator';

enum UserType {
  user = 'user',
  admin = 'admin',
}
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

  @IsEnum(UserType)
  type: UserType = UserType.user;
}
