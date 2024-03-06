import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Movie } from 'src/movie/schemas/movie.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //   Get user favourite list
  async getUserFavouritesList(
    userId: string,
    Title: string,
  ): Promise<Movie[] | null> {
    const userFavourites = await this.userModel
      .findById(userId)
      .populate('favouritesListes', '-__v');

    if (!userFavourites) {
      throw new NotFoundException('User not found');
    }

    const filteredFavourites =
      Title && Title.length > 3
        ? userFavourites.favouritesListes.filter((movie) =>
            movie.Title.toLowerCase().includes(Title.toLowerCase()),
          )
        : userFavourites.favouritesListes;

    return filteredFavourites;
  }

  // Register user
  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ success: boolean; message: string }> {
    const { username, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      password: hashedPassword,
    });

    user.password = undefined;

    return { success: true, message: 'User created successfully' };
  }

  async login(loginDto: LoginDto): Promise<{
    success: boolean;
    token: string;
    id: string;
    username: string;
    type: string;
  }> {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ username }).select('+password');

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    user.password = undefined;
    const token = this.jwtService.sign({ id: user._id });

    return {
      success: true,
      token,
      username: user.username,
      id: user._id,
      type: user.type,
    };
  }
}
