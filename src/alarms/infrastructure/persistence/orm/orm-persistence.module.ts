import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateAlarmRepository } from '@app/alarms/application/ports/create-alarm.repository';
import { FindManyAlarmsRepository } from '@app/alarms/application/ports/find-many-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '@app/alarms/application/ports/upsert-materialized-alarm.repository';

import { AlarmEntity } from './entities/alarm.entity';
import { AlarmItemEntity } from './entities/alarm-item.entity';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { OrmFindAlarmsRepository } from './repositories/find-alarms.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/materialized-alarm.repository';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view.schema';

@Module({
  exports: [
    CreateAlarmRepository,
    FindManyAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindManyAlarmsRepository,
      useClass: OrmFindAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
  ],
})
export class OrmPersistenceModule {}
