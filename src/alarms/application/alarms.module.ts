import { DynamicModule, Module, Type } from '@nestjs/common';

import { AlarmFactory } from '@app/alarms/domain/alarm.factory';
import { AlarmsController } from '@app/alarms/presentation/http/alarms.controller';

import { AlarmsService } from './alarms.service';
import { FindManyAlarmsQueryHandler } from './queries/find-many-alarms.query';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmFactory,
    AlarmsService,
    CreateAlarmCommandHandler,
    FindManyAlarmsQueryHandler,
  ],
})
export class AlarmsModule {
  static withInfrastructure(module: Type | DynamicModule) {
    return {
      imports: [module],
      module: AlarmsModule,
    };
  }
}
