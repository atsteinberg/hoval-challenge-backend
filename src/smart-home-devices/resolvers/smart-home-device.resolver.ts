import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateSmartHomeDeviceInput } from '../inputs/create-smart-home-device.input';
import { SetSmartHomeDeviceInput } from '../inputs/set-smart-home-device.input';
import { UpdateSmartHomeDeviceInput } from '../inputs/update-smart-home-device-input';
import { SmartHomeDevice } from '../models/smart-home-device.model';
import { SmartHomeDeviceService } from '../services/smart-home-device.service';

@Resolver()
export class SmartHomeDeviceResolver {
  constructor(
    private readonly smartHomeDeviceService: SmartHomeDeviceService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => [SmartHomeDevice])
  getSmartHomeDevices(@CurrentUser() user: User) {
    return this.smartHomeDeviceService.getSmartHomeDevices(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => SmartHomeDevice)
  getSmartHomeDevice(@Args('id') id: string, @CurrentUser() user: User) {
    return this.smartHomeDeviceService.getSmartHomeDevice(id, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SmartHomeDevice)
  updateSmartHomeDevice(
    @Args('input')
    input: UpdateSmartHomeDeviceInput,
    @CurrentUser() user: User,
  ) {
    return this.smartHomeDeviceService.updateSmartHomeDevice(user.id, input);
  }

  @Mutation(() => SmartHomeDevice)
  createSmartHomeDevice(
    @Args('input')
    input: CreateSmartHomeDeviceInput,
  ) {
    return this.smartHomeDeviceService.createSmartHomeDevice(input);
  }

  @Mutation(() => SmartHomeDevice)
  setSmartHomeDevice(@Args('input') input: SetSmartHomeDeviceInput) {
    return this.smartHomeDeviceService.setSmartHomeDevice(input);
  }

  @Subscription(() => SmartHomeDevice)
  changeOccurred() {
    return this.smartHomeDeviceService.changeOccurred();
  }
}
