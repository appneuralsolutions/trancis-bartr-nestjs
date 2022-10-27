import { Test, TestingModule } from '@nestjs/testing';
import { EbayIntgService } from './ebay-intg.service';

describe('EbayIntgService', () => {
  let service: EbayIntgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EbayIntgService],
    }).compile();

    service = module.get<EbayIntgService>(EbayIntgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
