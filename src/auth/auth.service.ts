import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private user: typeof User,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    try {
      await this.user.create({
        id: randomUUID(),
        username: registerDto.username,
        password: registerDto.password,
        name: registerDto.name
      })
    } catch (error) {
      if (error.name == "SequelizeUniqueConstraintError") {
        throw new BadRequestException("username is already exist")
      } else {
        throw new BadRequestException(error)
      }
    }
  }

  async login(loginDto: LoginDto): Promise<string> {
    try {
      // checking username
      const isExistLogin = await this.user.findOne({
        where: {
          username: loginDto.username
        },
      });
      if (!isExistLogin) {
        throw new UnauthorizedException("username or password wrong !!");
      }
      
      // checking password
      if (!compareSync(loginDto.password, isExistLogin.password)) {
        throw new UnauthorizedException("username or password wrong !!");
      }

      return this.jwtService.sign({
        id: isExistLogin.id,
        username: isExistLogin.username,
        name: isExistLogin.name,
        avatar: isExistLogin.avatar,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
