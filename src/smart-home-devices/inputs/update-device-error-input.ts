import { InputType, PickType } from '@nestjs/graphql';
import { DeviceError } from '../models/device-error.model';

const PickedType = PickType(DeviceError, ['status', 'id'], InputType);

@InputType()
export class UpdateDeviceErrorInput extends PickedType {}
