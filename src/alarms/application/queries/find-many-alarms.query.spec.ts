import { Test } from '@nestjs/testing';

import { AlarmReadModel } from '@app/alarms/domain/read-models/alarm.read-model';
import { FindManyAlarmsRepository } from '@app/alarms/application/ports/find-many-alarms.repository';

import {
  FindManyAlarmsQuery,
  FindManyAlarmsQueryHandler,
} from './find-many-alarms.query';

const mockAlarms: Array<AlarmReadModel> = [
  {
    uuid: '00000000-0000-0000-0000-000000000001',
    name: 'Test Alarm 1',
    severity: 'HIGH',
    triggeredAt: new Date(),
    acknowledgedAt: null,
    items: [
      {
        uuid: '00000000-0000-0000-0000-000000000011',
        name: 'trigger event 1',
        type: 'TYPE_1',
      },
      {
        uuid: '00000000-0000-0000-0000-000000000012',
        name: 'trigger event 2',
        type: 'TYPE_2',
      },
    ],
  },
  {
    uuid: '00000000-0000-0000-0000-000000000002',
    name: 'Test Alarm 2',
    severity: 'MEDIUM',
    triggeredAt: new Date(),
    acknowledgedAt: null,
    items: [
      {
        uuid: '00000000-0000-0000-0000-000000000021',
        name: 'trigger event 1',
        type: 'TYPE_1',
      },
      {
        uuid: '00000000-0000-0000-0000-000000000022',
        name: 'trigger event 2',
        type: 'TYPE_2',
      },
    ],
  },
  {
    uuid: '00000000-0000-0000-0000-000000000003',
    name: 'Test Alarm 3',
    severity: 'LOW',
    triggeredAt: new Date(new Date().setDate(new Date().getDate() - 1)), // yesterday
    acknowledgedAt: new Date(),
    items: [
      {
        uuid: '00000000-0000-0000-0000-000000000031',
        name: 'trigger event 1',
        type: 'TYPE_1',
      },
      {
        uuid: '00000000-0000-0000-0000-000000000032',
        name: 'trigger event 2',
        type: 'TYPE_2',
      },
    ],
  },
];

describe('FindManyAlarmsQuery handling', () => {
  describe('FindManyAlarmsQuery', () => {
    it('should create a FindManyAlarmsQuery instance', () => {
      const query = new FindManyAlarmsQuery();
      expect(query instanceof FindManyAlarmsQuery).toBe(true);
    });
  });

  describe('FindManyAlarmsQueryHandler', () => {
    let repository: FindManyAlarmsRepository;
    let handler: FindManyAlarmsQueryHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [
          FindManyAlarmsQueryHandler,
          {
            provide: FindManyAlarmsRepository,
            useValue: {
              findMany: jest.fn(),
            },
          },
        ],
      }).compile();

      repository = mod.get(FindManyAlarmsRepository);
      handler = mod.get(FindManyAlarmsQueryHandler);
    });

    describe('execute', () => {
      it('should return with an array of existing alarms', async () => {
        jest.spyOn(repository, 'findMany').mockResolvedValueOnce(mockAlarms);

        const [alarm1, alarm2, alarm3] = mockAlarms;
        const query = new FindManyAlarmsQuery();
        const response = await handler.execute(query);

        expect(response.length).toBe(3);
        expect(response[0].name).toBe(alarm1.name);
        expect(response[0].severity).toBe(alarm1.severity);
        expect(repository.findMany).toHaveBeenCalledTimes(1);
      });
    });
  });
});
