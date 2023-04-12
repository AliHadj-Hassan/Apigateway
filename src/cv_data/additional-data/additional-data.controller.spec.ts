import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalDataController } from './additional-data.controller';

describe('AdditionalDataController', () => {
  let controller: AdditionalDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalDataController],
    }).compile();

    controller = module.get<AdditionalDataController>(AdditionalDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
