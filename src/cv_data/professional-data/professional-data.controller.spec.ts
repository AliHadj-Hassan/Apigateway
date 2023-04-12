import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalDataController } from './professional-data.controller';

describe('ProfessionalDataController', () => {
  let controller: ProfessionalDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalDataController],
    }).compile();

    controller = module.get<ProfessionalDataController>(ProfessionalDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
