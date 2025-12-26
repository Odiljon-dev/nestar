import { Test, TestingModule } from '@nestjs/testing';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';

describe('TrainController', () => {
  let trainController: TrainController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrainController],
      providers: [TrainService],
    }).compile();

    trainController = app.get<TrainController>(TrainController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(trainController.getHello()).toBe('Hello World!');
    });
  });
});
