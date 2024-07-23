import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmEntity } from '@app/alarms/infrastructure/persistence/in-memory/entities/alarm.entity';
import { AlarmItem } from '@app/alarms/domain/alarm-item';
import { AlarmItemEntity } from '@app/alarms/infrastructure/persistence/in-memory/entities/alarm-item.entity';
import { AlarmSeverity } from '@app/alarms/domain/value-objects/alarm-severity';

export class AlarmMapper {
  static toDomain(entity: AlarmEntity): Alarm {
    const severity = AlarmSeverity.fromValue(entity.severity);
    const alarm = new Alarm(entity.uuid);
    alarm.acknowledgedAt = entity.acknowledgedAt;
    alarm.triggeredAt = entity.triggeredAt;
    alarm.severity = severity;
    alarm.name = entity.name;

    for (const item of entity.items) {
      const alarmItem = new AlarmItem(item.uuid, item.name, item.type);
      alarm.addAlarmItem(alarmItem);
    }

    return alarm;
  }

  static toPersistence(alarm: Alarm) {
    const entity = new AlarmEntity();
    entity.acknowledgedAt = alarm.acknowledgedAt;
    entity.triggeredAt = alarm.triggeredAt;
    entity.severity = alarm.severity.value;
    entity.uuid = alarm.uuid;
    entity.name = alarm.name;

    entity.items = [];
    for(const item of alarm.items) {
      const aie = new AlarmItemEntity();
      aie.name = item.name;
      aie.type = item.type;
      aie.uuid = item.uuid;
      entity.items.push(aie);
    }

    return entity;
  }
}
