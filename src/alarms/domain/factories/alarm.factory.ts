import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmSeverity } from '@app/alarms/domain/value-objects/alarm-severity';

type CreateAlarmOptionalParams = {
  items?: Array<{ name: string; type: string }>;
  triggeredAt?: Date;
};

@Injectable()
export class AlarmFactory {
  create(
    name: string,
    severity: string,
    {
      items = [],
      triggeredAt = new Date(),
    }: CreateAlarmOptionalParams = {},
  ) {
    const alarmId = randomUUID();
    const alarmSeverity = AlarmSeverity.fromValue(severity);
    const alarm = new Alarm(alarmId);

    alarm.name = name;
    alarm.severity = alarmSeverity;
    alarm.triggeredAt = triggeredAt;

    for (const item of items) {
      alarm.addAlarmItem({ name: item.name, type: item.type });
    }

    return alarm;
  }
}
