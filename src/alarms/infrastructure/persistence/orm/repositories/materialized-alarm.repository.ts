import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AlarmReadModel } from '@app/alarms/domain/read-models/alarm.read-model';
import { UpsertMaterializedAlarmRepository } from '@app/alarms/application/ports/upsert-materialized-alarm.repository';
import { MaterializedAlarmView } from '@app/alarms/infrastructure/persistence/orm/schemas/materialized-alarm-view.schema';

@Injectable()
export class OrmUpsertMaterializedAlarmRepository
  implements UpsertMaterializedAlarmRepository
{
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async upsert(
    alarm: Pick<AlarmReadModel, 'uuid'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    await this.alarmModel.findOneAndUpdate({ uuid: alarm.uuid }, alarm, {
      upsert: true,
    });
  }
}
