import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { SmartHomeDevice } from '../models/smart-home-device.model';

const PickedType = PickType(SmartHomeDevice, [
  'actualTemperature',
  'type',
  'ownerId',
]);
@InputType()
export class SetSmartHomeDeviceInput extends PartialType(
  PickedType,
  InputType,
) {
  id: string;
}
