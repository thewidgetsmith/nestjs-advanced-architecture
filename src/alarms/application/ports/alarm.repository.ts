import { Alarm } from '@app/alarms/domain/alarm';

export abstract class AlarmRepository {
  abstract findMany(): Promise<Alarm[]>;
  abstract save(alarm: Alarm): Promise<Alarm>;
}
