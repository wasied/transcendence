import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketsGateway } from './websockets.gateway';

describe('WebsocketsGateway', () => {
  let gateway: WebsocketsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketsGateway],
    }).compile();

    gateway = module.get<WebsocketsGateway>(WebsocketsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
