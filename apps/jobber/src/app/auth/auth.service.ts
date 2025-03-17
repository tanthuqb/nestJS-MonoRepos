import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.inputs';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { TokenPayLoad } from './token-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}
  async login({ email, password }: LoginInput, respone: Response) {
    {
      const user = await this.verifyUser(email, password);
      const expires = new Date();
      expires.setMilliseconds(
        expires.getTime() +
          parseInt(this.configService.getOrThrow('JWT_EXPIRES_IN'))
      );
      const tokenPayLoad: TokenPayLoad = {
        userId: user.id,
      };
      const accesToken = this.jwtService.sign(tokenPayLoad);
      respone.cookie('Authentication', accesToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        expires,
      });
      return user;
    }
  }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ where: { email } });
      const authenticaed = await compare(password, user.password);
      if (!authenticaed) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
