import { InputType, PartialType } from '@nestjs/graphql';
import { SmartHomeDevice } from '../models/smart-home-device.model';

@InputType()
export class SetSmartHomeDevice extends PartialType(SmartHomeDevice) {}
