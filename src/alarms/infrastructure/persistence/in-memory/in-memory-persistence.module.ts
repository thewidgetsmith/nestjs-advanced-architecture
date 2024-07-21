import { Module } from '@nestjs/common';

import { AlarmRepository } from '@app/alarms/application/ports/alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';

@Module({
  exports: [AlarmRepository],
  imports: [],
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    }
  ],
})
export class InMemoryPersistenceModule {}
