import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseCardController } from './purchase_card.controller';

describe('PurchaseCardController', () => {
  let controller: PurchaseCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseCardController],
    }).compile();

    controller = module.get<PurchaseCardController>(PurchaseCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
