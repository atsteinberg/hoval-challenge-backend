import { Module } from '@nestjs/common';
import { SmartHomeDeviceResolver } from './resolvers/smart-home-device.resolver';
import { SmartHomeDeviceService } from './services/smart-home-device.service';

@Module({
  providers: [SmartHomeDeviceResolver, SmartHomeDeviceService],
})
export class SmartHomeDevicesModule {}
