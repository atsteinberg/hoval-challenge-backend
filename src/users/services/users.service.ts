import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { includeAllSmartHomeDeviceModelsOption } from 'src/smart-home-devices/services/smart-home-device.service';
import { UserInput } from '../inputs/user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany({
      include: {
        smartHomeDevices: { ...includeAllSmartHomeDeviceModelsOption },
      },
    });
    return users;
  }

  async getUserById(id: string) {
    try {
      return await this.prismaService.user.findUnique({ where: { id } });
    } catch (_error) {
      throw new NotFoundException(`No user found with id ${id}`);
    }
  }

  async getUserByName(username: string) {
    try {
      return await this.prismaService.user.findUnique({ where: { username } });
    } catch (_error) {
      throw new NotFoundException(`No user found with username ${username}`);
    }
  }

  async createUser(newUser: UserInput) {
    const { type, password, ...rest } = newUser;
    try {
      return await this.prismaService.user.create({
        data: {
          type: type || 'User',
          hashedPassword: await hash(password, 10),
          ...rest,
        },
      });
    } catch (error) {
      throw new ConflictException('User creation failed.');
    }
  }
}
