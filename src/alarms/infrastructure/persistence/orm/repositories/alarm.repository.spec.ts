import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmEntity } from '@app/alarms/infrastructure/persistence/orm/entities/alarm.entity';
import { AlarmSeverity } from '@app/alarms/domain/value-objects/alarm-severity';
import { OrmAlarmRepository } from './alarm.repository';

const testAlarm1 = 'Test Alarm 1';
const testSeverity1 = 'high';

const oneAlarm = new AlarmEntity(
  testAlarm1,
  testSeverity1,
  '00000000-0000-0000-0000-000000000001',
);

const alarmsArray = [
  new AlarmEntity(
    testAlarm1,
    testSeverity1,
    '00000000-0000-0000-0000-000000000001',
  ),
  new AlarmEntity(
    'Test Alarm 2',
    'medium',
    '00000000-0000-0000-0000-000000000002',
  ),
  new AlarmEntity(
    'Test Alarm 3',
    'low',
    '00000000-0000-0000-0000-000000000003',
  ),
];

describe('OrmAlarmRepository', () => {
  let repository: OrmAlarmRepository;
  let ormRepo: Repository<AlarmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrmAlarmRepository,
        {
          provide: getRepositoryToken(AlarmEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(alarmsArray),
            save: jest.fn().mockResolvedValue(oneAlarm),
          },
        },
      ],
    }).compile();

    repository = module.get<OrmAlarmRepository>(OrmAlarmRepository);
    ormRepo = module.get<Repository<AlarmEntity>>(
      getRepositoryToken(AlarmEntity),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findMany method', () => {
    it('should return an array of alarms', async () => {
      expect.hasAssertions();

      const alarms = await repository.findMany();

      expect(alarms.length).toBe(3);
      expect(alarms[0].name).toEqual('Test Alarm 1');
      expect(alarms[1].name).toEqual('Test Alarm 2');
      expect(alarms[2].name).toEqual('Test Alarm 3');
    });
  });

  describe('create method', () => {
    it('should add a new alarm', async () => {
      expect.hasAssertions();

      const alarm: Alarm = {
        uuid: '00000000-0000-0000-0000-000000000004',
        severity: new AlarmSeverity('high'),
        name: 'Test Alarm 4',
      };

      const newAlarm = await repository.save(alarm);

      expect(ormRepo.save).toHaveBeenCalledTimes(1);
      expect(newAlarm.name).toBe('Test Alarm 1');
      expect(newAlarm.uuid).toBeDefined();
    });
  });
});
