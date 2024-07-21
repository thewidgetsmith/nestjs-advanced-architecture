import { AlarmMapper } from './alarm.mapper';

describe('AlarmMapper', () => {
  describe('toDomain', () => {
    it('should map an AlarmEntity to a domain Alarm', () => {
      const entity = {
        uuid: 'uuid',
        name: 'name',
        severity: 'critical',
      };

      const result = AlarmMapper.toDomain(entity as any);

      expect(result.uuid).toBe(entity.uuid);
      expect(result.name).toBe(entity.name);
      expect(result.severity.value).toBe(entity.severity);
    });
  });

  describe('toPersistence', () => {
    it('should map an Alarm to a persistence AlarmEntity', () => {
      const model = {
        uuid: 'uuid',
        name: 'name',
        severity: {
          value: 'critical',
        },
      };

      const result = AlarmMapper.toPersistence(model as any);

      expect(result.uuid).toBe(model.uuid);
      expect(result.name).toBe(model.name);
      expect(result.severity).toBe(model.severity.value);
    });
  });
});
