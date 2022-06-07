import { CreateSmartHomeDeviceInput } from 'src/smart-home-devices/inputs/create-smart-home-device.input';

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { WeekDay } from '../enums/smart-home-device.enums';

const DEFAULT_ACTUAL_TEMPERATURE = 20.5;
const everyDay = Object.values(WeekDay);

const includeAll = {
  errors: true,
  targetTemperatureSchedule: true,
  statusChanges: true,
};

@Injectable()
export class SmartHomeDeviceService {
  constructor(private readonly prismaService: PrismaService) {}

  getSmartHomeDevices() {
    return this.prismaService.smartHomeDevice.findMany({
      include: includeAll,
    });
  }

  async getSmartHomeDevice(id: string) {
    const device = await this.prismaService.smartHomeDevice.findUnique({
      where: { id },
      include: includeAll,
    });
    if (device) {
      return device;
    }
    throw new NotFoundException(`Cannot find smart home device with id ${id}`);
  }

  async createSmartHomeDevice(input: CreateSmartHomeDeviceInput) {
    try {
      const createdDevice = await this.prismaService.smartHomeDevice.create({
        data: {
          type: input.type,
          actualTemperature: DEFAULT_ACTUAL_TEMPERATURE,
          targetTemperatureSchedule: {
            create: [
              {
                days: everyDay,
                timeOfDay: ['Day'],
                targetTemperature: 21.0,
              },
              {
                days: everyDay,
                timeOfDay: ['Night'],
                targetTemperature: 20.0,
              },
            ],
          },
        },
      });
      console.log(createdDevice);
      const targetTemperatureSchedule = this.prismaService.smartHomeDevice
        .findUnique({
          where: { id: createdDevice.id },
        })
        .targetTemperatureSchedule();
      return {
        ...createdDevice,
        targetTemperatureSchedule,
        errors: [],
        statusChanges: [],
      };
    } catch (error) {
      throw new ForbiddenException('could not create smart home device');
    }
  }
}
