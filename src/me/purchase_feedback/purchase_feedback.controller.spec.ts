import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseFeedbackController } from './purchase_feedback.controller';

describe('PurchaseFeedbackController', () => {
  let controller: PurchaseFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseFeedbackController],
    }).compile();

    controller = module.get<PurchaseFeedbackController>(PurchaseFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
