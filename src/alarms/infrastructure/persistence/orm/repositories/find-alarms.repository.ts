import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AlarmReadModel } from '@app/alarms/domain/read-models/alarm.read-model';
import { FindManyAlarmsRepository } from '@app/alarms/application/ports/find-many-alarms.repository';
import { FindManyAlarmsQuery } from '@app/alarms/application/queries/find-many-alarms.query';
import { MaterializedAlarmView } from '@app/alarms/infrastructure/persistence/orm/schemas/materialized-alarm-view.schema';

@Injectable()
export class OrmFindAlarmsRepository implements FindManyAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findMany(query: FindManyAlarmsQuery): Promise<AlarmReadModel[]> {
    return await this.alarmModel.find();
  }
}
