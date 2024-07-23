import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AlarmCreatedEvent } from '@app/alarms/domain/events/alarm-created.event';
import { AlarmFactory } from '@app/alarms/domain/factories/alarm.factory';
import { CreateAlarmRepository } from '@app/alarms/application/ports/create-alarm.repository';

export class CreateAlarmCommand {
  constructor(
    public readonly name: string,
    public readonly severity: string,
    public readonly triggeredAt?: Date,
    public readonly items?: Array<{
      name: string;
      type: string;
    }>,
  ) {}
}

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.debug(
      `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
    );

    const { items, name, severity, triggeredAt } = command;
    const alarm = this.alarmFactory.create(name, severity, {
      triggeredAt,
      items,
    });

    const created = await this.alarmRepository.save(alarm);

    const event = new AlarmCreatedEvent(alarm);
    this.eventBus.publish(event);

    return created;
  }
}
