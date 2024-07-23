import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { AlarmFactory } from '@app/alarms/domain/factories/alarm.factory';
import { CreateAlarmRepository } from '@app/alarms/application/ports/create-alarm.repository';

import {
  CreateAlarmCommand,
  CreateAlarmCommandHandler,
} from './create-alarm.command';

describe('CreateAlarmCommand handling', () => {
  describe('CreateAlarmCommand', () => {
    it('should create a CreateAlarmCommand instance', () => {
      const { name, severity, triggeredAt, items } = {
        name: 'Test Alarm',
        severity: 'High',
        triggeredAt: new Date(),
        items: [
          {
            name: 'Test Item 1',
            type: 'TYPE_1',
          },
        ],
      };

      const itemsCount = items.length;
      const cmd = new CreateAlarmCommand(name, severity, triggeredAt, items);

      expect(cmd instanceof CreateAlarmCommand).toBe(true);
      expect(cmd.items).toHaveLength(itemsCount);
      expect(cmd.triggeredAt).toBe(triggeredAt);
      expect(cmd.severity).toBe(severity);
      expect(cmd.name).toBe(name);
    });
  });

  describe('CreateAlarmCommandHandler', () => {
    let handler: CreateAlarmCommandHandler;
    let repository: CreateAlarmRepository;
    let eventBus: EventBus;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [
          AlarmFactory,
          CreateAlarmCommandHandler,
          {
            provide: CreateAlarmRepository,
            useValue: {
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

      handler = mod.get(CreateAlarmCommandHandler);
      repository = mod.get(CreateAlarmRepository);
      eventBus = mod.get(EventBus);
    });

    describe('execute', () => {
      afterEach(() => {
        (eventBus.publish as jest.Mock).mockClear();
      });

      it('should return with a new test alarm', async () => {
        const { name, severity, triggeredAt, items } = {
          name: 'Test Alarm',
          severity: 'High',
          triggeredAt: new Date(),
          items: [
            {
              name: 'Test Item 1',
              type: 'TYPE_1',
            },
          ],
        };

        const optionals = { items, triggeredAt };
        const alarm = new AlarmFactory().create(name, severity, optionals);
        jest.spyOn(repository, 'save').mockResolvedValueOnce(alarm);

        const cmd = new CreateAlarmCommand(name, severity, triggeredAt, items);
        const response = await handler.execute(cmd);

        expect(repository.save).toHaveBeenCalledTimes(1);
        expect(response.getAlarmItems()).toHaveLength(items.length);
        expect(response.triggeredAt.getTime()).toBe(triggeredAt.getTime());
        expect(response.severity.value).toBe(severity);
        expect(response.uuid).toBe(alarm.uuid);
        expect(response.name).toBe(name);
      });
    });
  });
});
