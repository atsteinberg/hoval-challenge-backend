import { Test, TestingModule } from '@nestjs/testing';
import { SmartHomeDeviceService } from './smart-home-device.service';

describe('SmartHomeDeviceService', () => {
  let service: SmartHomeDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartHomeDeviceService],
    }).compile();

    service = module.get<SmartHomeDeviceService>(SmartHomeDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
