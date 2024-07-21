import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Alarm } from '../../domain/alarm';
import { AlarmRepository } from '../ports/alarm.repository';

export class FindManyAlarmsQuery {
  // TODO: add find criteria parameters here
  // TODO: add pagination parameters here
  constructor() {}
}

@QueryHandler(FindManyAlarmsQuery)
export class FindManyAlarmsQueryHandler
  implements IQueryHandler<FindManyAlarmsQuery, Alarm[]>
{
  constructor(private readonly alarmRepository: AlarmRepository) {}

  async execute(query: FindManyAlarmsQuery): Promise<Alarm[]> {
    return this.alarmRepository.findMany();
  }
}
