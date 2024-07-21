import { Injectable } from '@nestjs/common';

import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmEntity } from '@app/alarms/infrastructure/persistence/in-memory/entities/alarm.entity';
import { AlarmMapper } from '@app/alarms/infrastructure/persistence/in-memory/mappers/alarm.mapper';
import { AlarmRepository } from '@app/alarms/application/ports/alarm.repository';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();

  async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());
    return entities.map((it) => AlarmMapper.toDomain(it));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const model = AlarmMapper.toPersistence(alarm);
    this.alarms.set(model.uuid, model);

    const entity = this.alarms.get(model.uuid);
    return AlarmMapper.toDomain(entity);
  }
}
