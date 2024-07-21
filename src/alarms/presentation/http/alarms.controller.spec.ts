import { Test, TestingModule } from '@nestjs/testing';

import { AlarmFactory } from '@app/alarms/domain/alarm.factory';
import { AlarmRepository } from '@app/alarms/application/ports/alarm.repository';
import { AlarmsService } from '@app/alarms/application/alarms.service';
import { AlarmsController } from './alarms.controller';

describe('AlarmsController', () => {
  let controller: AlarmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmsController],
      providers: [
        AlarmFactory,
        AlarmsService,
        {
          provide: AlarmRepository,
          useValue: {
            findAll: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AlarmsController>(AlarmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
