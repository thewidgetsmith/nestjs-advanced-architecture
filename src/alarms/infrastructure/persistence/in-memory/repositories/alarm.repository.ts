import { Injectable } from '@nestjs/common';

import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmEntity } from '@app/alarms/infrastructure/persistence/in-memory/entities/alarm.entity';
import { AlarmMapper } from '@app/alarms/infrastructure/persistence/in-memory/mappers/alarm.mapper';
import { AlarmReadModel } from '@app/alarms/domain/read-models/alarm.read-model';
import { CreateAlarmRepository } from '@app/alarms/application/ports/create-alarm.repository';
import { FindManyAlarmsQuery } from '@app/alarms/application/queries/find-many-alarms.query';
import { FindManyAlarmsRepository } from '@app/alarms/application/ports/find-many-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '@app/alarms/application/ports/upsert-materialized-alarm.repository';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindManyAlarmsRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  async findMany(query: FindManyAlarmsQuery): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.uuid, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.uuid);
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'uuid'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.uuid)) {
      this.materializedAlarmViews.set(alarm.uuid, {
        ...this.materializedAlarmViews.get(alarm.uuid),
        ...alarm,
      });
      return;
    }

    this.materializedAlarmViews.set(alarm.uuid, alarm as AlarmReadModel);
  }
}
