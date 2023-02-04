import { Test, TestingModule } from '@nestjs/testing';
import { BitcoindInterfaceService } from './bitcoind-interface.service';

describe('BitcoindInterfaceService', () => {
  let service: BitcoindInterfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitcoindInterfaceService],
    }).compile();

    service = module.get<BitcoindInterfaceService>(BitcoindInterfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
