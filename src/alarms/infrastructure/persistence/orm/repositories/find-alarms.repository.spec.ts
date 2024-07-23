import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmEntity } from '@app/alarms/infrastructure/persistence/orm/entities/alarm.entity';
import { AlarmSeverity } from '@app/alarms/domain/value-objects/alarm-severity';
import { OrmFindAlarmsRepository } from './find-alarms.repository';
import { FindManyAlarmsQuery } from '@app/alarms/application/queries/find-many-alarms.query';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';

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

describe('OrmFindAlarmsRepository', () => {
  let repository: OrmFindAlarmsRepository;
  let ormRepo: Repository<AlarmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrmFindAlarmsRepository,
        {
          provide: MaterializedAlarmView,
          useValue: {
            find: jest.fn().mockResolvedValue(alarmsArray),
          },
        },
        {
          provide: getRepositoryToken(AlarmEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(alarmsArray),
          },
        },
      ],
    }).compile();

    repository = module.get<OrmFindAlarmsRepository>(OrmFindAlarmsRepository);
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

      const query = new FindManyAlarmsQuery();
      const alarms = await repository.findMany(query);

      expect(alarms.length).toBe(3);
      expect(alarms[0].name).toEqual('Test Alarm 1');
      expect(alarms[1].name).toEqual('Test Alarm 2');
      expect(alarms[2].name).toEqual('Test Alarm 3');
    });
  });
});
