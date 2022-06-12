import { InputType, PickType } from '@nestjs/graphql';
import { SmartHomeDevice } from '../models/smart-home-device.model';

@InputType('CreateSmartHomeDeviceInput')
export class CreateSmartHomeDeviceInput extends PickType(
  SmartHomeDevice,
  ['type', 'name', 'ownerId'],
  InputType,
) {}
