import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { Alarm } from '@app/alarms/domain/alarm';

export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<AlarmCreatedEvent>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  handle(event: AlarmCreatedEvent) {
    this.logger.debug(`Event "AlarmCreatedEvent": ${JSON.stringify(event)}`);
  }
}
