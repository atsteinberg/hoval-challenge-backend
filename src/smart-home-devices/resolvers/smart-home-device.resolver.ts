import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateSmartHomeDeviceInput } from '../inputs/create-smart-home-device.input';
import { SetSmartHomeDeviceInput } from '../inputs/set-smart-home-device.input';
import { UpdateDeviceErrorInput } from '../inputs/update-device-error-input';
import { UpdateSmartHomeDeviceInput } from '../inputs/update-smart-home-device-input';
import { DeviceError } from '../models/device-error.model';
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

  // TODO protect
  @Subscription(() => SmartHomeDevice)
  changeOccurred() {
    return this.smartHomeDeviceService.changeOccurred();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => DeviceError)
  getError(@Args('id') id: string, @CurrentUser() user: User) {
    return this.smartHomeDeviceService.getError(id, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeviceError)
  updateError(
    @Args('input') input: UpdateDeviceErrorInput,
    @CurrentUser() user: User,
  ) {
    return this.smartHomeDeviceService.updateError(user.id, input);
  }

  // admin functionality
  @Mutation(() => SmartHomeDevice)
  createSmartHomeDevice(
    @Args('input')
    input: CreateSmartHomeDeviceInput,
  ) {
    return this.smartHomeDeviceService.createSmartHomeDevice(input);
  }
  // admin functionality
  @Mutation(() => SmartHomeDevice)
  setSmartHomeDevice(@Args('input') input: SetSmartHomeDeviceInput) {
    return this.smartHomeDeviceService.setSmartHomeDevice(input);
  }
}
