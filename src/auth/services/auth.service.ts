import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/services/users.service';
import { JwtPayload } from '../types/jwt-payload.type';

// const hashData = (data: string) => hash(data, 10);

// const getNoSuchUserException = () =>
//   new ForbiddenException('no user with provided email and password found');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user || password !== user.hashedPassword) {
      return null;
    }
    const { hashedPassword: _, ...result } = user;
    return result;
  }

  login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }

  async verify(token: string) {
    const decodedPayload = this.jwtService.verify<JwtPayload>(token, {
      secret: '1234',
    });

    const user = this.usersService.getUserByEmail(decodedPayload.email);

    if (!user) {
      throw new BadRequestException('unable to get user from token.');
    }

    return user;
  }
}
