import { InputType, PickType } from '@nestjs/graphql';
import { SmartHomeDevice } from '../models/smart-home-device.model';

@InputType()
export class UpdateSmartHomeDeviceInput extends PickType(SmartHomeDevice, [
  'targetTemperatureSchedule',
]) {}
