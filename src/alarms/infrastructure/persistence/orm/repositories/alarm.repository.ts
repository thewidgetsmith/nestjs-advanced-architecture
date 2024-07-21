import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmEntity } from '@app/alarms/infrastructure/persistence/orm/entities/alarm.entity';
import { AlarmMapper } from '@app/alarms/infrastructure/persistence/orm/mappers/alarm.mapper';
import { AlarmRepository } from '@app/alarms/application/ports/alarm.repository';

@Injectable()
export class OrmAlarmRepository implements AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>
  ) {}

  async findMany(): Promise<Alarm[]> {
    const entities = await this.alarmRepository.find();
    return entities.map((it) => AlarmMapper.toDomain(it));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const model = AlarmMapper.toPersistence(alarm);
    const entity = await this.alarmRepository.save(model);
    return AlarmMapper.toDomain(entity);
  }
}
