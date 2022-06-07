import { InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';
import { UserType } from '../enums/user-type.enum';

@InputType()
export class UserInput extends PickType(
  User,
  ['email', 'hashedPassword'],
  InputType,
) {
  type?: UserType;
}
