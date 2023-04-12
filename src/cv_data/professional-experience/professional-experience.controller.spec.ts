import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalExperienceController } from './professional-experience.controller';

describe('ProfessionalExperienceController', () => {
  let controller: ProfessionalExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalExperienceController],
    }).compile();

    controller = module.get<ProfessionalExperienceController>(ProfessionalExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
