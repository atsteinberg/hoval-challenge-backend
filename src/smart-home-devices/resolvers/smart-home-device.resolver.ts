import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlAdminGuard } from 'src/auth/guards/qql-admin.guard';
import { CreateSmartHomeDeviceInput } from '../inputs/create-smart-home-device.input';
import { SetSmartHomeDeviceInput } from '../inputs/set-smart-home-device.input';
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
    console.log({ user });
    return this.smartHomeDeviceService.getSmartHomeDevice(id, user.id);
  }

  @Mutation(() => SmartHomeDevice)
  createSmartHomeDevice(
    @Args('input')
    input: CreateSmartHomeDeviceInput,
  ) {
    return this.smartHomeDeviceService.createSmartHomeDevice(input);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(() => SmartHomeDevice)
  setSmartHomeDevice(@Args('input') input: SetSmartHomeDeviceInput) {
    return this.smartHomeDeviceService.setSmartHomeDevice(input);
  }

  @Subscription(() => SmartHomeDevice)
  changeOccurred() {
    return this.smartHomeDeviceService.changeOccurred();
  }
}
