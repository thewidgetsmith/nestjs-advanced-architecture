import { Alarm } from '@app/alarms/domain/alarm';

export abstract class CreateAlarmRepository {
  abstract save(alarm: Alarm): Promise<Alarm>;
}
