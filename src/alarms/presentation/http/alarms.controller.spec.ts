import { Test, TestingModule } from '@nestjs/testing';

import { AlarmsService } from '@app/alarms/application/alarms.service';

import { AlarmsController } from './alarms.controller';

describe('AlarmsController', () => {
  let controller: AlarmsController;
  let service: AlarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmsController],
      providers: [
        {
          provide: AlarmsService,
          useValue: {
            findMany: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AlarmsController>(AlarmsController);
    service = module.get<AlarmsService>(AlarmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findMany method', () => {
    it('should return an array of alarms', async () => {
      expect.hasAssertions();

      await controller.findMany();

      expect(service.findMany).toHaveBeenCalled();
    });
  });

  describe('create method', () => {
    it('should return a new alarm', async () => {
      expect.hasAssertions();

      const { name, severity } = { name: 'Test Alarm', severity: 'high' };

      await controller.create({ name, severity });

      expect(service.create).toHaveBeenCalledWith({ name, severity });
    });
  });
});
