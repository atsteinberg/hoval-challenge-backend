import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { SmartHomeDevice } from '../models/smart-home-device.model';

const PickedType = PickType(
  SmartHomeDevice,
  ['targetTemperature', 'name'],
  InputType,
);
@InputType()
export class UpdateSmartHomeDeviceInput extends PartialType(PickedType) {
  @Field(() => String)
  id: string;
}
