import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Alarm } from '@app/alarms/domain/alarm';
import { AlarmEntity } from '@app/alarms/infrastructure/persistence/orm/entities/alarm.entity';
import { AlarmMapper } from '@app/alarms/infrastructure/persistence/orm/mappers/alarm.mapper';
import { CreateAlarmRepository } from '@app/alarms/application/ports/create-alarm.repository';

@Injectable()
export class OrmCreateAlarmRepository implements CreateAlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>
  ) {}

  async save(alarm: Alarm): Promise<Alarm> {
    const model = AlarmMapper.toPersistence(alarm);
    const entity = await this.alarmRepository.save(model);
    return AlarmMapper.toDomain(entity);
  }
}
