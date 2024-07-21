import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { AlarmFactory } from '@app/alarms/domain/alarm.factory';
import { AlarmRepository } from '@app/alarms/application/ports/alarm.repository';

import {
  FindManyAlarmsQuery,
  FindManyAlarmsQueryHandler,
} from './find-many-alarms.query';

describe('FindManyAlarmsQuery handling', () => {
  describe('FindManyAlarmsQuery', () => {
    it('should create a FindManyAlarmsQuery instance', () => {
      const query = new FindManyAlarmsQuery();

      expect(query instanceof FindManyAlarmsQuery).toBe(true);
    });
  });

  describe('FindManyAlarmsQueryHandler', () => {
    let handler: FindManyAlarmsQueryHandler;
    let repository: AlarmRepository;
    let eventBus: EventBus;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [
          FindManyAlarmsQueryHandler,
          {
            provide: AlarmRepository,
            useValue: {
              findMany: jest.fn(),
              save: jest.fn(),
            },
          },
          {
            provide: EventBus,
            useValue: {
              publish: jest.fn(),
            },
          },
        ],
      }).compile();

      handler = mod.get(FindManyAlarmsQueryHandler);
      repository = mod.get(AlarmRepository);
      eventBus = mod.get(EventBus);
    });

    describe('execute', () => {
      afterEach(() => {
        (eventBus.publish as jest.Mock).mockClear();
      });

      it('should return with an array of existing alarms', async () => {
        const { name, severity } = { name: 'Test Alarm 2', severity: 'high' };

        const alarm1 = new AlarmFactory().create(name, severity);
        const alarm2 = new AlarmFactory().create('Test Alarm 2', 'medium');
        const alarm3 = new AlarmFactory().create('Test Alarm 3', 'low');
        jest
          .spyOn(repository, 'findMany')
          .mockResolvedValueOnce([alarm1, alarm2, alarm3]);

        const cmd = new FindManyAlarmsQuery();
        const response = await handler.execute(cmd);

        expect(response.length).toBe(3);
        expect(response[0].name).toBe(name);
        expect(response[0].severity.value).toBe(severity);
        expect(repository.findMany).toHaveBeenCalledTimes(1);
      });
    });
  });
});
