import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUserByName(username);
    if (!user || !compare(password, user.hashedPassword)) {
      return null;
    }
    const { hashedPassword: _, ...result } = user;
    return result;
  }

  login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
