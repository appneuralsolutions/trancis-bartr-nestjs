import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseCardService } from './purchase_card.service';

describe('PurchaseCardService', () => {
  let service: PurchaseCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseCardService],
    }).compile();

    service = module.get<PurchaseCardService>(PurchaseCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
