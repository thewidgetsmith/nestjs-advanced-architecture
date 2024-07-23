import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmReadModel } from '@app/alarms/domain/read-models/alarm.read-model';
import { FindManyAlarmsRepository } from '@app/alarms/application/ports/find-many-alarms.repository';

export class FindManyAlarmsQuery {
  // TODO: add find criteria parameters here
  // TODO: add pagination parameters here
  constructor() {}
}

@QueryHandler(FindManyAlarmsQuery)
export class FindManyAlarmsQueryHandler
  implements IQueryHandler<FindManyAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: FindManyAlarmsRepository) {}

  async execute(query: FindManyAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findMany(query);
  }
}
