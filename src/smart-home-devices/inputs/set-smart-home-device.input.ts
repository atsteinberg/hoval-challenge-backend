import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { DeviceError } from '../models/device-error.model';
import { SmartHomeDevice } from '../models/smart-home-device.model';

const PickedType = PickType(SmartHomeDevice, [
  'actualTemperature',
  'type',
  'ownerId',
]);

const PartialError = PartialType(DeviceError, InputType);
@InputType()
export class SetSmartHomeDeviceInput extends PartialType(
  PickedType,
  InputType,
) {
  id: string;
}
