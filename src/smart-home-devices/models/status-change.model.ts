import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatusChange {
  id: string;
  date: Date;
  event: string;
}
