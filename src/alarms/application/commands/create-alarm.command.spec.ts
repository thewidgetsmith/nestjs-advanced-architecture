import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { AlarmFactory } from '@app/alarms/domain/alarm.factory';
import { AlarmRepository } from '@app/alarms/application/ports/alarm.repository';

import {
  CreateAlarmCommand,
  CreateAlarmCommandHandler,
} from './create-alarm.command';

describe('CreateAlarmCommand handling', () => {
  describe('CreateAlarmCommand', () => {
    it('should create a CreateAlarmCommand instance', () => {
      const cmd = new CreateAlarmCommand('Test Alarm', 'High');

      expect(cmd instanceof CreateAlarmCommand).toBe(true);
      expect(cmd.name).toBe('Test Alarm');
      expect(cmd.severity).toBe('High');
    });
  });

  describe('CreateAlarmCommandHandler', () => {
    let handler: CreateAlarmCommandHandler;
    let repository: AlarmRepository;
    let eventBus: EventBus;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [
          AlarmFactory,
          CreateAlarmCommandHandler,
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

      handler = mod.get(CreateAlarmCommandHandler);
      repository = mod.get(AlarmRepository);
      eventBus = mod.get(EventBus);
    });

    describe('execute', () => {
      afterEach(() => {
        (eventBus.publish as jest.Mock).mockClear();
      });

      it('should return with a new test alarm', async () => {
        const { name, severity } = { name: 'Test Alarm', severity: 'high' };

        const alarm = new AlarmFactory().create(name, severity);
        jest.spyOn(repository, 'save').mockResolvedValueOnce(alarm);

        const cmd = new CreateAlarmCommand(name, severity);
        const response = await handler.execute(cmd);

        expect(response.name).toBe(name);
        expect(response.severity.value).toBe(severity);
        expect(repository.save).toHaveBeenCalledTimes(1);
      });
    });
  });
});
