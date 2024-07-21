import { Test, TestingModule } from '@nestjs/testing';
import { AlarmFactory } from '@app/alarms/domain/alarm.factory';

import { AlarmRepository } from './ports/alarm.repository';
import { AlarmsService } from './alarms.service';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmSeverity } from '../domain/value-objects/alarm-severity';

describe('AlarmsService', () => {
  let repository: AlarmRepository;
  let service: AlarmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    repository = module.get<AlarmRepository>(AlarmRepository);
    service = module.get<AlarmsService>(AlarmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll method', () => {
    it('should return an array of alarms', async () => {
      expect.hasAssertions();

      jest.spyOn(repository, 'findAll').mockResolvedValueOnce([
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

      const alarms = await service.findAll();

      expect(alarms.length).toBe(3);
      expect(alarms[0].name).toEqual('Test Alarm 1');
      expect(alarms[1].name).toEqual('Test Alarm 2');
      expect(alarms[2].name).toEqual('Test Alarm 3');
    });
  });

  describe('create method', () => {
    it('should add a new alarm', async () => {
      expect.hasAssertions();

      const cmd: CreateAlarmCommand = {
        name: 'Test Alarm',
        severity: 'high',
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce({
        // overwrite uuid with a fixed value
        uuid: '00000000-0000-0000-0000-000000000000',
        severity: new AlarmSeverity('high'),
        name: cmd.name,
      });

      const newAlarm = await service.create(cmd);

      expect(newAlarm.name).toEqual(cmd.name);
      expect(newAlarm.severity.value).toBe('high');
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });
});
