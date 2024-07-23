import { Module } from '@nestjs/common';
import { CreateAlarmRepository } from '@app/alarms/application/ports/create-alarm.repository';
import { FindManyAlarmsRepository } from '@app/alarms/application/ports/find-many-alarms.repository';
import { InMemoryAlarmRepository } from '@app/alarms/infrastructure/persistence/in-memory/repositories/alarm.repository';
import { UpsertMaterializedAlarmRepository } from '@app/alarms/application/ports/upsert-materialized-alarm.repository';

@Module({
  imports: [],
  providers: [
    InMemoryAlarmRepository,
    { provide: CreateAlarmRepository, useExisting: InMemoryAlarmRepository },
    { provide: FindManyAlarmsRepository, useExisting: InMemoryAlarmRepository },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindManyAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InMemoryPersistenceModule {}
