import { Test, TestingModule } from '@nestjs/testing';

import { AlarmReadModel } from '@app/alarms/domain/read-models/alarm.read-model';
import { AlarmsService } from '@app/alarms/application/alarms.service';

import { AlarmsController } from './alarms.controller';

const mockAlarms: Array<AlarmReadModel> = [
  {
    uuid: '00000000-0000-0000-0000-000000000001',
    name: 'Test Alarm 1',
    severity: 'HIGH',
    acknowledgedAt: null,
    triggeredAt: new Date(),
    items: [
      { name: 'trigger event 1', type: 'TYPE_1' },
      { name: 'trigger event 2', type: 'TYPE_2' },
    ],
  },
  {
    uuid: '00000000-0000-0000-0000-000000000002',
    name: 'Test Alarm 2',
    severity: 'MEDIUM',
    acknowledgedAt: null,
    triggeredAt: new Date(),
    items: [
      { name: 'trigger event 1', type: 'TYPE_1' },
      { name: 'trigger event 2', type: 'TYPE_2' },
    ],
  },
  {
    uuid: '00000000-0000-0000-0000-000000000003',
    name: 'Test Alarm 3',
    severity: 'LOW',
    acknowledgedAt: null,
    triggeredAt: new Date(),
    items: [
      { name: 'trigger event 1', type: 'TYPE_1' },
      { name: 'trigger event 2', type: 'TYPE_2' },
    ],
  },
];

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

      const [alarm1, alarm2, alarm3] = mockAlarms;
      jest.spyOn(service, 'findMany').mockResolvedValue(mockAlarms);

      const response = await controller.findMany();

      expect(service.findMany).toHaveBeenCalled();
      expect(response[0].severity).toBe(alarm1.severity);
      expect(response[0].name).toBe(alarm1.name);
      expect(response).toHaveLength(3);
    });
  });

  describe('create method', () => {
    it('should return a new alarm', async () => {
      expect.hasAssertions();

      jest.spyOn(service, 'create').mockResolvedValue(mockAlarms[0]);

      const given = {
        name: mockAlarms[0].name,
        severity: mockAlarms[0].severity,
        triggeredAt: mockAlarms[0].triggeredAt,
        items: mockAlarms[0].items,
      };

      const response = await controller.create(given);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(response.uuid).toBe(mockAlarms[0].uuid);
      expect(response.severity).toBe(given.severity);
      expect(response.name).toBe(given.name);
    });
  });
});
