import { Test, TestingModule } from '@nestjs/testing';
import { GlobalGateway } from './global.gateway';

describe('GlobalGateway', () => {
  let gateway: GlobalGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalGateway],
    }).compile();

    gateway = module.get<GlobalGateway>(GlobalGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
