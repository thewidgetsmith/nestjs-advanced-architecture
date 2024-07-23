import { AlarmReadModel } from '@app/alarms/domain/read-models/alarm.read-model';
import { FindManyAlarmsQuery } from '@app/alarms/application/queries/find-many-alarms.query';

export abstract class FindManyAlarmsRepository {
  abstract findMany(query: FindManyAlarmsQuery): Promise<AlarmReadModel[]>;
}
