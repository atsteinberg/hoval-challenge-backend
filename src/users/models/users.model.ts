import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { SmartHomeDevice } from 'src/smart-home-devices/models/smart-home-device.model';
import { UserType } from '../enums/user-type.enum';

registerEnumType(UserType, { name: 'UserType' });

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @IsString()
  username: string;

  type: UserType;

  @Field(() => [SmartHomeDevice])
  smartHomeDevices: SmartHomeDevice[];
}
