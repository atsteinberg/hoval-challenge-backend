import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { DeviceType } from '../enums/smart-home-device.enums';
import { DeviceError } from './device-error.model';
import { StatusChange } from './status-change.model';
import { UserInteraction } from './user-interaction.model';

registerEnumType(DeviceType, {
  name: 'DeviceType',
});

@ObjectType()
export class SmartHomeDevice {
  @Field(() => ID)
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId?: string;
  type: DeviceType;
  actualTemperature: number;
  targetTemperature: number;
  name: string;
  @Field(() => [DeviceError])
  errors: [DeviceError];
  @Field(() => [StatusChange])
  statusChanges: [StatusChange];
  @Field(() => [UserInteraction])
  userInteractions: [UserInteraction];
}
