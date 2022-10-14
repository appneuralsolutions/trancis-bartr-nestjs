import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseFeedbackService } from './purchase_feedback.service';

describe('PurchaseFeedbackService', () => {
  let service: PurchaseFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseFeedbackService],
    }).compile();

    service = module.get<PurchaseFeedbackService>(PurchaseFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
