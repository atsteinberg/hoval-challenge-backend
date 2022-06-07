import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';
import { WeekDay } from '../enums/smart-home-device.enums';

registerEnumType(WeekDay, {
  name: 'WeekDay',
});

@ObjectType()
@InputType('TargetTemperatureEntryInput')
export class TargetTemperatureEntry {
  from?: Date;
  to?: Date;
  @Field(() => [WeekDay])
  days: WeekDay[];
  @IsNumber()
  @Min(0)
  @Max(50)
  targetTemperature: number;
}

// @ObjectType()
// class TargetTemperatureSchedule {
//   default: TargetTemperatureEntry;
//   entries: TargetTemperatureEntry[];
// }
