import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.inputs';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userSevice: UsersService) {}
  async login({ email, password }: LoginInput, respone: Response) {
    {
      const user = await this.verifyUser(email, password);
    }
  }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.userSevice.getUser({ where: { email } });
      const authenticaed = await compare(password, user.password);
      if (!authenticaed) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
