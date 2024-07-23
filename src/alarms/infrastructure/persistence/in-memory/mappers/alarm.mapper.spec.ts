import { AlarmMapper } from './alarm.mapper';

describe('AlarmMapper', () => {
  describe('toDomain', () => {
    it('should map an AlarmEntity to a domain Alarm', () => {
      const entity = {
        uuid: 'uuid',
        name: 'name',
        severity: 'critical',
        triggeredAt: new Date(),
        acknowledgedAt: new Date(),
        items: [
          { name: 'trigger event 1', type: 'TYPE_1' },
          { name: 'trigger event 2', type: 'TYPE_2' },
        ],
      };

      const result = AlarmMapper.toDomain(entity as any);

      expect(result.uuid).toBe(entity.uuid);
      expect(result.name).toBe(entity.name);
      expect(result.severity.value).toBe(entity.severity);
      expect(result.triggeredAt).toBe(entity.triggeredAt);
      expect(result.items).toHaveLength(entity.items.length);
    });
  });

  describe('toPersistence', () => {
    it('should map an Alarm to a persistence AlarmEntity', () => {
      const model = {
        uuid: 'uuid',
        name: 'name',
        triggeredAt: new Date(),
        acknowledgedAt: new Date(),
        severity: {
          value: 'critical',
        },
        items: [
          { name: 'trigger event 1', type: 'TYPE_1' },
          { name: 'trigger event 2', type: 'TYPE_2' },
        ],
      };

      const result = AlarmMapper.toPersistence(model as any);

      expect(result.uuid).toBe(model.uuid);
      expect(result.name).toBe(model.name);
      expect(result.severity).toBe(model.severity.value);
      expect(result.triggeredAt).toBe(model.triggeredAt);
      expect(result.items).toHaveLength(model.items.length);
    });
  });
});
