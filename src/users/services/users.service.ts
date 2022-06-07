import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { includeAllSmartHomeDeviceModelsOption } from 'src/smart-home-devices/services/smart-home-device.service';
import { UserInput } from '../inputs/user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const users = await this.prismaService.user.findMany({
      include: {
        smartHomeDevices: { ...includeAllSmartHomeDeviceModelsOption },
      },
    });
    console.log(users[0].smartHomeDevices);
    return users;
  }

  async getOne(id: string) {
    try {
      return await this.prismaService.user.findUnique({ where: { id } });
    } catch (_error) {
      throw new NotFoundException(`No user found with id ${id}`);
    }
  }

  async createUser(newUser: UserInput) {
    const { type, ...rest } = newUser;
    try {
      return await this.prismaService.user.create({
        data: {
          type: type || 'User',
          ...rest,
        },
      });
    } catch (error) {
      throw new ConflictException('User creation failed.');
    }
  }
}
