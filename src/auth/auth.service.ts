import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async create(createAuthInput: CreateAuthInput) {
    const user = await this.userService.create(createAuthInput);
    return user;
  }

  async login(loginAuthDto: LoginAuthDto, res: Response) {
    console.log(res);
    const { email, password } = loginAuthDto;
    const user = await this.userService.validateUser(email, password);

    const payload = {
      id: user.id,
      role: user.role,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    res.cookie('jwt', refreshToken, {
      maxAge: Number(process.env.COOKIE_EXP) || 36000000,
      httpOnly: true,
    });
    await this.userService.update(user.id, { refreshToken });

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXP,
      secret: process.env.ACCESS_TOKEN_KEY,
    });
    return { accessToken };
  }
}
