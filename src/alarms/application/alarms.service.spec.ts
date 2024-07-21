import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AlarmSeverity } from '@app/alarms/domain/value-objects/alarm-severity';

import { AlarmsService } from './alarms.service';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { FindManyAlarmsQuery } from './queries/find-many-alarms.query';

describe('AlarmsService', () => {
  let service: AlarmsService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlarmsService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<AlarmsService>(AlarmsService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany method', () => {
    it('should return an array of alarms', async () => {
      expect.hasAssertions();

      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce([
        {
          uuid: '00000000-0000-0000-0000-000000000001',
          severity: new AlarmSeverity('high'),
          name: 'Test Alarm 1',
        },
        {
          uuid: '00000000-0000-0000-0000-000000000002',
          severity: new AlarmSeverity('medium'),
          name: 'Test Alarm 2',
        },
        {
          uuid: '00000000-0000-0000-0000-000000000003',
          severity: new AlarmSeverity('low'),
          name: 'Test Alarm 3',
        }
      ]);

      const query = new FindManyAlarmsQuery();
      const alarms = await service.findMany(query);

      expect(alarms.length).toBe(3);
      expect(alarms[0].name).toEqual('Test Alarm 1');
      expect(alarms[1].name).toEqual('Test Alarm 2');
      expect(alarms[2].name).toEqual('Test Alarm 3');
      expect(queryBus.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('create method', () => {
    it('should add a new alarm', async () => {
      expect.hasAssertions();

      const cmd: CreateAlarmCommand = {
        name: 'Test Alarm',
        severity: 'high',
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce({
        // overwrite uuid with a fixed value
        uuid: '00000000-0000-0000-0000-000000000000',
        severity: new AlarmSeverity('high'),
        name: cmd.name,
      });

      const newAlarm = await service.create(cmd);

      expect(newAlarm.name).toEqual(cmd.name);
      expect(newAlarm.severity.value).toBe('high');
      expect(commandBus.execute).toHaveBeenCalledTimes(1);
    });
  });
});
