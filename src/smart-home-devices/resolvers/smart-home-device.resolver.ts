import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSmartHomeDeviceInput } from '../inputs/create-smart-home-device.input';
import { SetSmartHomeDeviceInput } from '../inputs/set-smart-home-device.input';
import { SmartHomeDevice } from '../models/smart-home-device.model';
import { SmartHomeDeviceService } from '../services/smart-home-device.service';

@Resolver()
export class SmartHomeDeviceResolver {
  constructor(
    private readonly smartHomeDeviceService: SmartHomeDeviceService,
  ) {}
  @Query(() => [SmartHomeDevice])
  getSmartHomeDevices() {
    return this.smartHomeDeviceService.getSmartHomeDevices();
  }

  @Query(() => SmartHomeDevice)
  getSmartHomeDevice(@Args('id') id: string) {
    return this.smartHomeDeviceService.getSmartHomeDevice(id);
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
}
