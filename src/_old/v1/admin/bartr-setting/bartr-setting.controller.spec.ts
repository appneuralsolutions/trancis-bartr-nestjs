import { Test, TestingModule } from '@nestjs/testing';
import { BartrSettingController } from './bartr-setting.controller';

describe('BartrSettingController', () => {
  let controller: BartrSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BartrSettingController],
    }).compile();

    controller = module.get<BartrSettingController>(BartrSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
