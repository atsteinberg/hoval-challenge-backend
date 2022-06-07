import { Field, InputType } from '@nestjs/graphql';
import { DeviceType } from '../enums/smart-home-device.enums';

@InputType('CreateSmartHomeDeviceInput')
export class CreateSmartHomeDeviceInput {
  ownerId?: string;

  @Field(() => DeviceType)
  type: DeviceType;
}
