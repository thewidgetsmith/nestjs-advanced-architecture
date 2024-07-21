import { Test, TestingModule } from '@nestjs/testing';

import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmSeverity } from '@app/alarms/domain/value-objects/alarm-severity';
import { InMemoryAlarmRepository } from './alarm.repository';

const alarm1: Alarm = {
  uuid: '00000000-0000-0000-0000-000000000001',
  severity: new AlarmSeverity('high'),
  name: 'Test Alarm 1',
};

const alarm2: Alarm = {
  uuid: '00000000-0000-0000-0000-000000000002',
  severity: new AlarmSeverity('medium'),
  name: 'Test Alarm 2',
};

const alarm3: Alarm = {
  uuid: '00000000-0000-0000-0000-000000000003',
  severity: new AlarmSeverity('low'),
  name: 'Test Alarm 3',
};

describe('InMemoryAlarmRepository', () => {
  let repository: InMemoryAlarmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryAlarmRepository],
    }).compile();

    repository = module.get<InMemoryAlarmRepository>(InMemoryAlarmRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // The InMemoryAlarmRepository stores the alarms in a private readonly
  // member called alarms. This member is initialized with an empty array.
  // It is then inaccessible for direct manipulation. Therefore, the testing
  // strategy is multi-step. First, save new alarms then retrieve them.

  describe('save and findAll methods', () => {
    it('should add a new alarm, test, then return the alarms', async () => {
      expect.hasAssertions();

      const newAlarm1 = await repository.save(alarm1);

      expect(newAlarm1.name).toBe('Test Alarm 1');
      expect(newAlarm1.uuid).toBeDefined();

      await repository.save(alarm2);
      await repository.save(alarm3);

      const alarms = await repository.findAll();

      expect(alarms.length).toBe(3);
      expect(alarms[0].name).toEqual('Test Alarm 1');
      expect(alarms[1].name).toEqual('Test Alarm 2');
      expect(alarms[2].name).toEqual('Test Alarm 3');
    });
  });
});
