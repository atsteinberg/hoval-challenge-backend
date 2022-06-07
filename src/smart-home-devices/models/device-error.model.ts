import { InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ErrorStatus } from '../enums/smart-home-device.enums';

registerEnumType(ErrorStatus, {
  name: 'ErrorStatus',
});

@ObjectType()
@InputType('DeviceErrorInput')
export class DeviceError {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  errorType: string;
  message: string;
  status: ErrorStatus;
}
