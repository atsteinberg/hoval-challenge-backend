import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserInteractionType } from '../enums/smart-home-device.enums';

registerEnumType(UserInteractionType, {
  name: 'UserInteractionType',
});

@ObjectType()
export class UserInteraction {
  id: string;
  date: Date;
  interactionType: UserInteractionType;
  message: string;
}
