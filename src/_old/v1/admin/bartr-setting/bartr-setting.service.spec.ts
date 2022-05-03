import { Test, TestingModule } from '@nestjs/testing';
import { BartrSettingService } from './bartr-setting.service';

describe('BartrSettingService', () => {
  let service: BartrSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BartrSettingService],
    }).compile();

    service = module.get<BartrSettingService>(BartrSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
