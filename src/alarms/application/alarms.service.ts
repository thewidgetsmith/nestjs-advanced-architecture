import { Injectable } from '@nestjs/common';

import { CreateAlarmCommand } from './commands/create-alarm.command';
import { FindManyAlarmsQuery } from './queries/find-many-alarms.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  findMany(query: FindManyAlarmsQuery) {
    return this.queryBus.execute(query);
  }

  create(cmd: CreateAlarmCommand) {
    return this.commandBus.execute(cmd);
  }
}
