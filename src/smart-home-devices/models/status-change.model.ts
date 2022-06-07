import { InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('StatusChangeInput')
export class StatusChange {
  id: string;
  date: Date;
  event: string;
}
