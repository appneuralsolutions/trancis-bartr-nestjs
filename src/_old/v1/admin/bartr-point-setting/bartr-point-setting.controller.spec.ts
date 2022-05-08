import { Test, TestingModule } from '@nestjs/testing';
import { BartrPointSettingController } from './bartr-point-setting.controller';

describe('BartrPointSettingController', () => {
  let controller: BartrPointSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BartrPointSettingController],
    }).compile();

    controller = module.get<BartrPointSettingController>(
      BartrPointSettingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
