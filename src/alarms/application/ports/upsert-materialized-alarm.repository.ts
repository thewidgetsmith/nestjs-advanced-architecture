import { AlarmReadModel } from '@app/alarms/domain/read-models/alarm.read-model';

export abstract class UpsertMaterializedAlarmRepository {
  abstract upsert(
    alarm: Pick<AlarmReadModel, 'uuid'> & Partial<AlarmReadModel>,
  ): Promise<void>;
}
