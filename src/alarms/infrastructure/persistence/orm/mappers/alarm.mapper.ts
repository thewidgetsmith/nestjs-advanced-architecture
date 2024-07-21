import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmEntity } from '@app/alarms/infrastructure/persistence/orm/entities/alarm.entity';
import { AlarmSeverity } from '@app/alarms/domain/value-objects/alarm-severity';

export class AlarmMapper {
  static toDomain(entity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      entity.severity as 'critical' | 'low' | 'medium' | 'high',
    );

    const model = new Alarm(entity.uuid, entity.name, alarmSeverity);
    return model;
  }

  static toPersistence(model: Alarm) {
    const severity = new AlarmSeverity(model.severity.value);
    const entity = new AlarmEntity(
      model.name,
      severity.value,
      model.uuid,
    );

    return entity;
  }
}
