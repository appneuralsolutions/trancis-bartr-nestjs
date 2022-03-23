import { Test, TestingModule } from '@nestjs/testing';
import { EbayIntgController } from './ebay-intg.controller';

describe('EbayIntgController', () => {
  let controller: EbayIntgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EbayIntgController],
    }).compile();

    controller = module.get<EbayIntgController>(EbayIntgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
