import { CreateSmartHomeDeviceInput } from 'src/smart-home-devices/inputs/create-smart-home-device.input';

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { WeekDay } from '../enums/smart-home-device.enums';
import { SetSmartHomeDeviceInput } from '../inputs/set-smart-home-device.input';
import { PubSub } from 'graphql-subscriptions';

const DEFAULT_ACTUAL_TEMPERATURE = 20.5;
const everyDay = Object.values(WeekDay);

const pubSub = new PubSub();

export const includeAllSmartHomeDeviceModelsOption = {
  include: {
    errors: true,
    targetTemperatureSchedule: true,
    statusChanges: true,
  },
};

@Injectable()
export class SmartHomeDeviceService {
  constructor(private readonly prismaService: PrismaService) {}

  getSmartHomeDevices() {
    return this.prismaService.smartHomeDevice.findMany({
      ...includeAllSmartHomeDeviceModelsOption,
    });
  }

  async getSmartHomeDevice(id: string) {
    const device = await this.prismaService.smartHomeDevice.findUnique({
      where: { id },
      ...includeAllSmartHomeDeviceModelsOption,
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
        ...includeAllSmartHomeDeviceModelsOption,
      });
      // const targetTemperatureSchedule = this.prismaService.smartHomeDevice
      //   .findUnique({
      //     where: { id: createdDevice.id },
      //   })
      //   .targetTemperatureSchedule();
      // return {
      //   ...createdDevice,
      //   targetTemperatureSchedule,
      //   errors: [],
      //   statusChanges: [],
      // };
      return createdDevice;
    } catch (error) {
      throw new ForbiddenException('could not create smart home device');
    }
  }

  async setSmartHomeDevice(input: SetSmartHomeDeviceInput) {
    const { id, ownerId, ...updates } = input;
    const deviceInCurrentState =
      await this.prismaService.smartHomeDevice.findUnique({
        where: { id },
      });
    if (!deviceInCurrentState) {
      throw new NotFoundException(
        `No smart home device found with id ${input.id}`,
      );
    }
    const updatedDevice = await this.prismaService.smartHomeDevice.update({
      where: { id },
      data: {
        actualTemperature: updates.actualTemperature,
        ownerId,
      },
      ...includeAllSmartHomeDeviceModelsOption,
    });
    if (
      deviceInCurrentState.actualTemperature !== updatedDevice.actualTemperature
    ) {
      pubSub.publish('changeOccurred', { changeOccurred: updatedDevice });
    }
    return updatedDevice;
  }

  changeOccurred() {
    return pubSub.asyncIterator('changeOccurred');
  }
}
