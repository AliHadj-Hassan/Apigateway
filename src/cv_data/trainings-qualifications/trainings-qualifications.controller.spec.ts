import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsQualificationsController } from './trainings-qualifications.controller';

describe('TrainingsQualificationsController', () => {
  let controller: TrainingsQualificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingsQualificationsController],
    }).compile();

    controller = module.get<TrainingsQualificationsController>(TrainingsQualificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
